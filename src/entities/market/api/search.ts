import { fetchJson } from "@/shared/api";
import type { MarketType } from "../model/types";

export type SearchItem = { id?: string; symbol: string; name?: string };
export type SearchResponse = { items: SearchItem[] };

export function searchSymbols(params: { type: MarketType; q: string }) {
  const qs = new URLSearchParams({
    type: params.type === "crypto" ? "crypto" : "stock",
    q: params.q,
  });

  return fetchJson<SearchResponse>(`/api/search?${qs.toString()}`);
}



