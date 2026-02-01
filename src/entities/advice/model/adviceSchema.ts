import { z } from "zod";

export const AdviceSchema = z.object({
  asset: z.object({
    type: z.enum(["stock", "crypto"]),
    symbol: z.string(),
    currency: z.string().default("USD"),
    source: z.string(),
  }),
  timeframe: z.enum(["1D", "1H"]).default("1D"),
  recommendation: z.object({
    action: z.enum(["BUY", "SELL", "HOLD", "WATCH"]),
    confidence: z.number().min(0).max(1),
    horizon: z.enum(["intraday", "swing", "long_term"]),
  }),
  rationale: z.object({
    bullish: z.array(z.string()),
    bearish: z.array(z.string()),
    risks: z.array(z.string()),
  }),
  levels: z.object({
    entry: z.number().nullable(),
    take_profit: z.number().nullable(),
    stop_loss: z.number().nullable(),
  }),
  risk_management: z.object({
    max_risk_pct: z.number().min(0).max(5),
    note: z.string(),
  }),
  next_checks: z.array(z.string()),
  disclaimer: z.string(),
});

export type Advice = z.infer<typeof AdviceSchema>;
