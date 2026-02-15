import { fetchJson } from "@/shared/api";
import type { CandlesResponse, MarketType } from "../model/types";

export type TF = "1D" | "1H" | "1W" | "1M";

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



