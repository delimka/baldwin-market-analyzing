import type { Candle, MarketType } from "@/entities/market/types";

export type ProviderParams = {
  type: MarketType;
  symbol: string;
  currency?: string; // usd
  days?: number; // 30/60/200
  timeframe?: "1D" | "1H";
};

export interface MarketProvider {
  name: string;
  supports(p: ProviderParams): boolean;
  fetchCandles(p: ProviderParams): Promise<Candle[]>;
}
