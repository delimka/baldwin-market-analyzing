import { NextResponse } from "next/server";
import { z } from "zod";
import { pickProvider } from "@/lib/market/providers";
import type { CandlesResponse } from "@/entities/market/types";

const Q = z.object({
  type: z.enum(["stock", "crypto"]),
  symbol: z.string().min(1),
  currency: z.string().default("usd"),
  days: z.coerce.number().min(7).max(365).default(60),
  timeframe: z.enum(["1D", "1H"]).default("1D"),
});

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const params = Q.parse({
      type: url.searchParams.get("type"),
      symbol: url.searchParams.get("symbol"),
      currency: url.searchParams.get("currency") ?? "usd",
      days: url.searchParams.get("days") ?? "60",
      timeframe: url.searchParams.get("timeframe") ?? "1D",
    });

    const provider = pickProvider(params);
    const candles = await provider.fetchCandles(params);

    const out: CandlesResponse = {
      type: params.type,
      symbol: params.symbol,
      currency: params.currency,
      source: provider.name,
      candles,
    };

    return NextResponse.json(out);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 400 });
  }
}
