"use client";

import { useQuery } from "@tanstack/react-query";
import { ScreenerRequest } from "@/entities/market/model/types";
import { fetchScreener } from "@/shared/api/screener";

export function useScreener(params: ScreenerRequest | null) {
  return useQuery({
    queryKey: ["screener", params],
    queryFn: () => fetchScreener(params!),
    enabled: !!params,
    staleTime: Infinity,
    refetchInterval: false,
  });
}
