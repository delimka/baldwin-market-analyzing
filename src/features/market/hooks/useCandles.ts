"use client";

import { useQuery } from "@tanstack/react-query";
import { getCandles, type TF } from "@/shared/api/market";
import type { CandlesResponse, MarketType } from "@/entities/market/types";

export function useCandles(params: {
  type: MarketType;
  symbol: string;
  timeframe: TF;
}) {
  const symbol = params.symbol.trim();

  return useQuery<CandlesResponse, Error>({
    queryKey: ["candles", params.type, symbol, params.timeframe],
    queryFn: () => getCandles({ ...params, symbol }),
    enabled: symbol.length > 0,
    staleTime: 30_000,
  });
}
