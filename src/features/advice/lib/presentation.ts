import type { Advice } from "@/entities/advice";

type Action = Advice["recommendation"]["action"];
type Horizon = Advice["recommendation"]["horizon"];

export const ADVICE_ITEMS_PREVIEW_LIMIT = 3;
export const ADVICE_CHECKS_PREVIEW_LIMIT = 4;
export const ADVICE_ITEMS_ALL_LIMIT = 999;

export function getActionStyles(action: Action) {
  switch (action) {
    case "BUY":
      return { chip: "bg-green-600 text-white", ring: "ring-green-600/20" };
    case "SELL":
      return { chip: "bg-red-600 text-white", ring: "ring-red-600/20" };
    case "HOLD":
      return { chip: "bg-blue-600 text-white", ring: "ring-blue-600/20" };
    case "WATCH":
    default:
      return { chip: "bg-yellow-500 text-black", ring: "ring-yellow-500/20" };
  }
}

export function formatLevelValue(value: number | null) {
  if (value === null) return "";

  const abs = Math.abs(value);
  if (abs >= 1000) return value.toFixed(0);
  if (abs >= 100) return value.toFixed(2);
  if (abs >= 1) return value.toFixed(4);
  return value.toPrecision(6);
}

export function getConfidencePercent(data: Advice | null) {
  if (!data) return 0;
  return Math.max(0, Math.min(100, Math.round(data.recommendation.confidence * 100)));
}

export function getHorizonKey(horizon: Horizon) {
  switch (horizon) {
    case "intraday":
      return "advice.horizon.intraday";
    case "swing":
      return "advice.horizon.swing";
    case "long_term":
      return "advice.horizon.longTerm";
  }
}
