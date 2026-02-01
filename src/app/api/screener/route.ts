// import { NextResponse } from "next/server";
// import { z } from "zod";
// import { pickProvider } from "@/entities/market/api/providers";
// import type { Candle } from "@/entities/market/model/types";
// import { chunk } from "@/shared/lib/array/chunk";

// const BINANCE_BASE =
//   process.env.BINANCE_DATA_BASE ?? "https://data-api.binance.vision";

// type Ticker24h = {
//   symbol: string;
//   lastPrice: string;
//   priceChangePercent: string;
//   quoteVolume: string;
//   highPrice: string;
//   lowPrice: string;
// };

// const BodySchema = z.object({
//   type: z.enum(["crypto", "stock"]).default("crypto"),
//   currency: z.string().default("usd"),
//   timeframe: z.enum(["1D", "1H"]).default("1H"),
//   days: z.coerce.number().min(2).max(365).default(7),

//   // сколько вернуть в ответе
//   top: z
//     .union([z.literal(5), z.literal(10), z.literal(20), z.literal(30)])
//     .default(20),

//   // формирование универсума
//   universeSize: z.coerce.number().min(5).max(50).default(20), // хотим 20
//   liquidityPool: z.coerce.number().min(30).max(500).default(200), // из скольких самых ликвидных выбирать

//   withNews: z.boolean().default(true),
// });

// type NewsItem = {
//   title: string;
//   sentiment?: "positive" | "negative" | "neutral";
// };

// async function getAllUsdtTickers(): Promise<Ticker24h[]> {
//   const res = await fetch(`${BINANCE_BASE}/api/v3/ticker/24hr`, {
//     next: { revalidate: 30 },
//   });
//   if (!res.ok) throw new Error(`Binance ticker/24hr failed: ${res.status}`);
//   return (await res.json()) as Ticker24h[];
// }

// function baseFromSymbol(sym: string) {
//   return sym.replace("USDT", "");
// }

// function pct(a: number, b: number) {
//   if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return 0;
//   return ((a - b) / b) * 100;
// }

// function volRange24hPct(t: Ticker24h) {
//   const last = Number(t.lastPrice);
//   const hi = Number(t.highPrice);
//   const lo = Number(t.lowPrice);
//   if (!Number.isFinite(last) || last <= 0) return 0;
//   if (!Number.isFinite(hi) || !Number.isFinite(lo)) return 0;
//   return ((hi - lo) / last) * 100;
// }

// function stddev(values: number[]) {
//   if (values.length < 2) return 0;
//   const mean = values.reduce((s, x) => s + x, 0) / values.length;
//   const v = values.reduce((s, x) => s + (x - mean) ** 2, 0) / values.length;
//   return Math.sqrt(v);
// }

// function calcVolatilityPctFromCloses(closes: number[], window = 24) {
//   const xs = closes.slice(-(window + 1));
//   if (xs.length < 2) return 0;
//   const rets: number[] = [];
//   for (let i = 1; i < xs.length; i++) {
//     const prev = xs[i - 1];
//     const cur = xs[i];
//     if (prev > 0 && cur > 0) rets.push(Math.log(cur / prev));
//   }
//   return stddev(rets) * 100;
// }

// function rsi(closes: number[], period = 14) {
//   if (closes.length < period + 1) return 50;
//   let gains = 0;
//   let losses = 0;

//   for (let i = closes.length - period; i < closes.length; i++) {
//     const diff = closes[i] - closes[i - 1];
//     if (diff >= 0) gains += diff;
//     else losses += -diff;
//   }

//   const avgGain = gains / period;
//   const avgLoss = losses / period;
//   if (avgLoss === 0) return 100;
//   const rs = avgGain / avgLoss;
//   return 100 - 100 / (1 + rs);
// }

// function ema(values: number[], period: number) {
//   if (!values.length) return [];
//   const k = 2 / (period + 1);
//   const out: number[] = [];
//   let prev = values[0];
//   out.push(prev);
//   for (let i = 1; i < values.length; i++) {
//     prev = values[i] * k + prev * (1 - k);
//     out.push(prev);
//   }
//   return out;
// }

// function macdHist(closes: number[]) {
//   if (closes.length < 35) return 0;
//   const ema12 = ema(closes, 12);
//   const ema26 = ema(closes, 26);
//   const macd = closes.map((_, i) => (ema12[i] ?? 0) - (ema26[i] ?? 0));
//   const signal = ema(macd, 9);
//   const hist = macd.map((v, i) => v - (signal[i] ?? 0));
//   return hist.at(-1) ?? 0;
// }

// async function getNewsMap(bases: string[]): Promise<Map<string, NewsItem[]>> {
//   const token = process.env.CRYPTOPANIC_TOKEN;
//   const map = new Map<string, NewsItem[]>();
//   if (!token) return map;

//   const url = new URL("https://cryptopanic.com/api/v1/posts/");
//   url.searchParams.set("auth_token", token);
//   url.searchParams.set("kind", "news");
//   url.searchParams.set("public", "true");
//   url.searchParams.set("currencies", bases.slice(0, 80).join(","));

//   const res = await fetch(url.toString(), { next: { revalidate: 60 } });
//   if (!res.ok) return map;

//   const data = await res.json();
//   const results = (data?.results ?? []) as any[];

//   for (const r of results) {
//     const title = String(r?.title ?? "");
//     const titleUp = title.toUpperCase();
//     const sentiment: NewsItem["sentiment"] = r?.votes
//       ? r.votes.positive > r.votes.negative
//         ? "positive"
//         : r.votes.negative > r.votes.positive
//         ? "negative"
//         : "neutral"
//       : undefined;

//     for (const b of bases.slice(0, 80)) {
//       if (titleUp.includes(b)) {
//         if (!map.has(b)) map.set(b, []);
//         map.get(b)!.push({ title, sentiment });
//       }
//     }
//   }

//   return map;
// }

// export async function POST(req: Request) {
//   try {
//     const body = BodySchema.parse(await req.json().catch(() => ({})));

//     if (body.type !== "crypto") {
//       return NextResponse.json(
//         { error: "Screener implemented for crypto only" },
//         { status: 400 }
//       );
//     }

//     const all = await getAllUsdtTickers();

//     const filtered = all
//       .filter((t) => t.symbol.endsWith("USDT"))
//       .filter(
//         (t) =>
//           ![
//             "BUSDUSDT",
//             "USDCUSDT",
//             "FDUSDUSDT",
//             "USDPUSDT",
//             "TUSDUSDT",
//             "DAIUSDT",
//             "USDTUSDT",
//           ].includes(t.symbol)
//       );

//     const liquidPool = filtered
//       .slice()
//       .sort((a, b) => Number(b.quoteVolume) - Number(a.quoteVolume))
//       .slice(0, body.liquidityPool);

//     const universe = liquidPool
//       .slice()
//       .sort((a, b) => volRange24hPct(b) - volRange24hPct(a))
//       .slice(0, body.universeSize);

//     const bases = universe.map((t) => baseFromSymbol(t.symbol));

//     const newsMap = body.withNews ? await getNewsMap(bases) : new Map();

//     const items: any[] = [];

//     for (const part of chunk(universe, 10)) {
//       const rows = await Promise.all(
//         part.map(async (t) => {
//           const base = baseFromSymbol(t.symbol);

//           const params = {
//             type: "crypto" as const,
//             symbol: base,
//             currency: body.currency,
//             days: body.days,
//             timeframe: body.timeframe as "1D" | "1H",
//           };

//           const provider = pickProvider(params);
//           const candles: Candle[] = await provider.fetchCandles(params);

//           const price = Number(t.lastPrice);
//           const change24hPct = Number(t.priceChangePercent);
//           const range24hPct = volRange24hPct(t);

//           const closes = candles.map((c) => c.close).filter(Number.isFinite);
//           const last = closes.at(-1) ?? price;
//           const prev =
//             closes.at(-(body.timeframe === "1H" ? 25 : 8)) ??
//             closes.at(0) ??
//             last;
//           const momentum = pct(last, prev);

//           const volBarPct = calcVolatilityPctFromCloses(
//             closes,
//             body.timeframe === "1H" ? 24 : 14
//           );

//           const rsi14 = rsi(closes, 14);
//           const hist = macdHist(closes);

//           const news = newsMap.get(base) ?? [];
//           const newsCount = news.length;
//           const newsSentiment =
//             newsCount === 0
//               ? 0
//               : news.reduce(
//                   (s, n) =>
//                     s +
//                     (n.sentiment === "positive"
//                       ? 1
//                       : n.sentiment === "negative"
//                       ? -1
//                       : 0),
//                   0
//                 ) / newsCount;

//           // ---- Signal logic (простая, но полезная) ----
//           // LONG: momentum +, MACD hist >= 0, RSI не перекуплен
//           // SHORT: momentum -, MACD hist <= 0, RSI не перепродан (или перекуплен с разворотом)
//           let signal: "LONG" | "SHORT" | "NEUTRAL" = "NEUTRAL";

//           const longOk =
//             momentum > 0.8 && hist >= 0 && rsi14 >= 40 && rsi14 <= 72;
//           const shortOk =
//             momentum < -0.8 && hist <= 0 && rsi14 >= 28 && rsi14 <= 60;

//           if (longOk) signal = "LONG";
//           else if (shortOk) signal = "SHORT";

//           // ---- Score ----
//           // newsSentiment: [-1..+1] -> *10
//           // вола штрафуем, но не убиваем (иначе топ-вола не покажет ничего)
//           const baseScore =
//             0.35 * change24hPct +
//             0.35 * momentum +
//             0.2 * (newsSentiment * 10) +
//             0.1 * (hist * 100); // hist обычно маленький

//           const volPenalty = Math.max(0, volBarPct - 1.2) * 0.8; // “вола на бар”
//           const signed = signal === "SHORT" ? -1 : signal === "LONG" ? 1 : 0;

//           const score =
//             signed === 0
//               ? baseScore - volPenalty
//               : (baseScore - volPenalty) * signed;

//           const reasons: string[] = [];
//           reasons.push(`universe: vol24h ${range24hPct.toFixed(1)}%`);
//           if (Math.abs(change24hPct) > 2)
//             reasons.push(`24h ${change24hPct.toFixed(1)}%`);
//           if (Math.abs(momentum) > 1)
//             reasons.push(`mom ${momentum.toFixed(1)}%`);
//           reasons.push(`RSI ${rsi14.toFixed(0)}`);
//           reasons.push(`MACD ${hist >= 0 ? "+" : "-"}(${hist.toFixed(4)})`);
//           if (newsCount > 0)
//             reasons.push(`news ${newsCount} (${newsSentiment.toFixed(2)})`);
//           if (volPenalty > 0) reasons.push(`vol penalty`);

//           return {
//             symbol: base,
//             signal,
//             score,
//             price,
//             change24hPct,
//             range24hPct,
//             volatilityPct: volBarPct,
//             momentum,
//             rsi14,
//             macdHist: hist,
//             newsCount,
//             newsSentiment,
//             reasons,
//             source: provider.name,
//           };
//         })
//       );

//       items.push(...rows);
//     }

//     items.sort((a, b) => Math.abs(b.score) - Math.abs(a.score));

//     return NextResponse.json({
//       asOf: new Date().toISOString(),
//       timeframe: body.timeframe,
//       universe: {
//         method: "top_by_24h_range_volatility",
//         size: body.universeSize,
//         liquidityPool: body.liquidityPool,
//       },
//       top: body.top,
//       items: items.slice(0, body.top),
//     });
//   } catch (e: unknown) {
//     if (e instanceof Error) {
//       return NextResponse.json({ error: e.message }, { status: 400 });
//     }
//     return NextResponse.json({ error: "Unknown error" }, { status: 400 });
//   }
// }
