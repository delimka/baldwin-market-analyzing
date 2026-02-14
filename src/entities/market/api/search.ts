import { fetchJson } from "@/shared/api";
import type { MarketType } from "../model/types";

export type SearchItem = { id?: string; symbol: string; name?: string };
export type SearchResponse = { items: SearchItem[] };

export type CryptoLogoItem = {
  id: string;
  symbol: string;
  name: string;
  thumb: string;
  large: string;
  marketCapRank: number | null;
};

export type CryptoLogosResponse = { items: CryptoLogoItem[] };

export function searchSymbols(params: { type: MarketType; q: string }) {
  const qs = new URLSearchParams({
    type: params.type === "crypto" ? "crypto" : "stock",
    q: params.q,
  });

  return fetchJson<SearchResponse>(`/api/search?${qs.toString()}`);
}

export function getCryptoLogos(params?: { q?: string; limit?: number }) {
  const qs = new URLSearchParams({
    q: params?.q ?? "coin",
    limit: String(params?.limit ?? 20),
  });

  return fetchJson<CryptoLogosResponse>(`/api/crypto/logos?${qs.toString()}`);
}
