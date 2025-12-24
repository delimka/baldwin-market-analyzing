import { fetchJson } from "./http";
import type { Advice } from "@/lib/openai/schemas/adviceSchema";
import type { MarketType } from "@/entities/market/types";
import type { TF } from "./market";

export type AdviceRequest = {
  type: MarketType;
  symbol: string;
  currency?: string;
  days?: number;
  timeframe: TF;
};

export function getAdvice(payload: AdviceRequest) {
  return fetchJson<Advice>("/api/advice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      currency: payload.currency ?? "usd",
      days: payload.days ?? 60,
    }),
  });
}
