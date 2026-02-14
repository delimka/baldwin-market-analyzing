import { fetchJson } from "@/shared/api";
import type { Advice } from "../model/adviceSchema";
import type { MarketType } from "@/entities/market";
import type { TF } from "@/entities/market";

export type AdviceRequest = {
  type: MarketType;
  symbol: string;
  currency?: string;
  days?: number;
  timeframe: TF;
  lang: string;
};

export function getAdvice(payload: AdviceRequest) {
  return fetchJson<Advice>("/api/advice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      currency: payload.currency ?? "usd",
      days: payload.days ?? 60,
      lang: payload.lang ?? "eng",
    }),
  });
}




