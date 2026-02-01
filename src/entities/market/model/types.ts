import { z } from "zod";

export type MarketType = "stock" | "crypto";

export type Candle = {
  t: number; // ms timestamp
  close: number; // MVP
};

export type ExtendedCandle = Candle & {
  open: number;
  high: number;
  low: number;
};
export type CandlesResponse = {
  type: MarketType;
  symbol: string;
  currency: string;
  source: string;
  candles: Candle[];
};

export type StooqRow = {
  Date: string;
  Open: string;
  High: string;
  Low: string;
  Close: string;
  Volume: string;
};
export type Ticker24h = {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  quoteVolume: string;
};

export type ScreenerTop = 5 | 10 | 20 | 30;
export type ScreenerTimeframe = "1H" | "1D";

export type ScreenerRequest = {
  type: "crypto" | "stock";
  top: ScreenerTop;
  timeframe: ScreenerTimeframe;
  universeSize: number;
  days?: number;
  liquidityPool?: number;
  withNews?: boolean;
  runId?: number;
};

export type ScreenerItem = {
  symbol: string;
  score: number;
  price: number;
  change24hPct: number;
  volatilityPct: number;
  newsCount: number;
  newsSentiment: number;
  reasons: string[];
  range24hPct?: number;
  momentum?: number;
  rsi14?: number;
  macdHist?: number;
  signal?: "LONG" | "SHORT" | "NEUTRAL";
  source: string;
};

export type ScreenerResponse = {
  asOf: string;
  top: ScreenerTop;
  timeframe: ScreenerTimeframe;
  items: ScreenerItem[];
};

export const BinanceKlineSchema = z.tuple([
  z.number(), // openTime
  z.string(), // open
  z.string(), // high
  z.string(), // low
  z.string(), // close
  z.string(), // volume
  z.number(), // closeTime
  z.string(),
  z.number(),
  z.string(),
  z.string(),
  z.string(),
]);

export const BinanceKlinesSchema = z.array(BinanceKlineSchema);

export type BinanceKline = z.infer<typeof BinanceKlineSchema>;
