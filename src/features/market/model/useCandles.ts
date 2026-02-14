"use client";

import { useQuery } from "@tanstack/react-query";
import { getCandles, type TF } from "@/entities/market";
import type { CandlesResponse, MarketType } from "@/entities/market";

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

