import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

import { openai } from "@/entities/market/api/providers/openai";
import { AdviceSchema } from "@/entities/advice/model/adviceSchema";
import { computeIndicators } from "@/entities/market/lib/indicators";
import { pickProvider } from "@/entities/market/api/providers";

import { Candle } from "@/entities/market/model/types";

const BodySchema = z.object({
  type: z.enum(["stock", "crypto"]),
  symbol: z.string().min(1),
  currency: z.string().default("usd"),
  days: z.number().min(7).max(365).default(60),
  timeframe: z.enum(["1D", "1H"]).default("1D"),
  lang: z.string().default("eng"),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    console.log("RAW BODY", raw);
    const body = BodySchema.parse(raw);

    const provider = pickProvider(body);

    const candles: Candle[] = await provider.fetchCandles(body);
    console.log("get advice candles", candles);
    if (candles.length < 60) {
      return NextResponse.json(
        { error: "Not enough data, at least 60 points are required" },
        { status: 400 },
      );
    }

    const closes = candles.map((c: Candle) => c.close);
    const lastClose = closes[closes.length - 1];
    const ind = computeIndicators(closes);

    const marketSnapshot = {
      lastClose,
      changePct_7:
        (lastClose / closes[Math.max(0, closes.length - 8)] - 1) * 100,
      indicators: ind,
      candles_tail: candles.slice(-20),
      source: provider.name,
    };

    const system = `
        You are a market analyst. Provide "signal" and financial advice. In ${body.lang} language.
            If data is insufficient or noisy, prefer WATCH/HOLD.
            Output strictly in the given JSON schema.
            `;
    console.log("system promtyste", system);

    const user = `
            Asset: ${body.symbol} (${body.type}), currency: ${
              body.currency
            }, timeframe: ${body.timeframe}
            Data snapshot (latest values + indicators):
            ${JSON.stringify(marketSnapshot, null, 2)}
            `;

    const response = await openai.responses.parse({
      model: "gpt-5-mini",
      input: [
        { role: "system", content: system.trim() },
        { role: "user", content: user.trim() },
      ],
      text: { format: zodTextFormat(AdviceSchema, "trade_advice") },
    });

    return NextResponse.json(response.output_parsed);
  } catch (e: unknown) {
    if (e instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid request body", details: e.issues },
        { status: 400 },
      );
    }
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
