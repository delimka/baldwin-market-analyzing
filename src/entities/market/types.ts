import { z } from "zod";

export type MarketType = "stock" | "crypto";

export type Candle = {
  t: number; // ms timestamp
  close: number; // MVP
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
