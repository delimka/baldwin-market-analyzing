import { fetchJson } from "./http";
import type { CandlesResponse, MarketType } from "@/entities/market/types";

export type TF = "1D" | "1H";

export function getCandles(params: {
  type: MarketType;
  symbol: string;
  timeframe: TF;
  days?: number;
  currency?: string;
}) {
  const qs = new URLSearchParams({
    type: params.type,
    symbol: params.symbol,
    timeframe: params.timeframe,
    days: String(params.days ?? 60),
    currency: params.currency ?? "usd",
  });

  return fetchJson<CandlesResponse>(`/api/candles?${qs.toString()}`);
}
