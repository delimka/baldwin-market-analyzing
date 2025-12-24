import type { Candle } from "@/entities/market/types";
import { BinanceKlinesSchema } from "@/entities/market/types";
import type { MarketProvider, ProviderParams } from "./base";

function toBinanceSymbol(symbol: string) {
  // btc -> BTCUSDT, eth -> ETHUSDT
  const s = symbol.toUpperCase().replace("-", "").replace("/", "");
  return s.endsWith("USDT") ? s : `${s}USDT`;
}

export const BinanceProvider: MarketProvider = {
  name: "binance",
  supports(p: ProviderParams) {
    return (
      p.type === "crypto" && (p.timeframe === "1H" || p.timeframe === "1D")
    );
  },
  async fetchCandles(p: ProviderParams): Promise<Candle[]> {
    const interval = p.timeframe === "1H" ? "1h" : "1d";
    const limit = Math.min(
      1000,
      (p.days ?? 60) * (p.timeframe === "1H" ? 24 : 1)
    );
    const sym = toBinanceSymbol(p.symbol);

    const res = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${encodeURIComponent(
        sym
      )}&interval=${interval}&limit=${limit}`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) throw new Error("Binance: error klines");
    const raw = await res.json();
    const data = BinanceKlinesSchema.parse(raw);

    console.log("binance data", data);

    return data
      .map(
        (k): Candle => ({
          t: k[0],
          close: Number(k[4]),
        })
      )
      .filter((c) => Number.isFinite(c.close));
    // [ openTime, open, high, low, close, volume, closeTime, ...]
    return data
      .map((k) => ({ t: Number(k[0]), close: Number(k[4]) }))
      .filter((c) => Number.isFinite(c.close));
  },
};
