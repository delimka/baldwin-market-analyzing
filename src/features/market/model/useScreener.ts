"use client";

import { useQuery } from "@tanstack/react-query";
import { ScreenerRequest } from "@/entities/market";
import { fetchScreener } from "@/entities/market";

export function useScreener(params: ScreenerRequest | null) {
  return useQuery({
    queryKey: ["screener", params],
    queryFn: () => fetchScreener(params!),
    enabled: !!params,
    staleTime: Infinity,
    refetchInterval: false,
  });
}

