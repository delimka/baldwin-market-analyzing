import type { Candle } from "../types";
import type { MarketProvider, ProviderParams } from "./base";

async function symbolToId(symbol: string): Promise<string | null> {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(
      symbol
    )}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.coins?.[0]?.id ?? null;
}

export const CoinGeckoProvider: MarketProvider = {
  name: "coingecko",
  supports(p: ProviderParams) {
    return p.type === "crypto";
  },
  async fetchCandles(p: ProviderParams): Promise<Candle[]> {
    const id = await symbolToId(p.symbol);
    if (!id) throw new Error(`CoinGecko: didn't find ${p.symbol}`);

    const vs = (p.currency ?? "usd").toLowerCase();
    const days = p.days ?? 60;

    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${encodeURIComponent(
        vs
      )}&days=${days}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("CoinGecko: error market_chart");
    const data = await res.json();

    console.log("coingecko data", data);
    const prices: [number, number][] = data?.prices ?? [];
    return prices.map(([t, close]) => ({ t, close }));
  },
};
