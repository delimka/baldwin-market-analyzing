"use client";

import { useQuery } from "@tanstack/react-query";
import { getCryptoLogos } from "@/entities/market";

export function useCryptoLogos(limit = 20) {
  return useQuery({
    queryKey: ["crypto-logos", limit],
    queryFn: () => getCryptoLogos({ limit }),
    staleTime: 86_400_000,
    gcTime: 604_800_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
