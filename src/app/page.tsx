"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { Badge } from "@/components/shadcn/badge";
import { Separator } from "@/components/shadcn/separator";

import { PriceChart } from "@/components/PriceChart";
import { CandlesResponse } from "@/lib/market/types";
import type { Advice } from "@/lib/openai/schemas/adviceSchema";

type MarketType = "stock" | "crypto";
type TF = "1D" | "1H";

type AdviceRequest = {
  type: MarketType;
  symbol: string;
  currency: string;
  days: number;
  timeframe: TF;
};

type AdviceResponse = { error: string } | Advice;

async function getCandles(
  type: MarketType,
  symbol: string,
  timeframe: TF
): Promise<CandlesResponse> {
  const qs = new URLSearchParams({
    type,
    symbol,
    timeframe,
    days: "60",
    currency: "usd",
  });

  const res = await fetch(`/api/candles?${qs.toString()}`);
  if (!res.ok) throw new Error("Was not able to fetch candles");

  return (await res.json()) as CandlesResponse;
}

async function getAdvice(payload: AdviceRequest): Promise<AdviceResponse> {
  const res = await fetch("/api/advice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json: unknown = await res.json();

  if (!res.ok) {
    const msg =
      typeof json === "object" && json !== null && "error" in json
        ? String((json as { error?: unknown }).error ?? "Unknown error")
        : "Unknown error";
    return { error: msg };
  }

  return json as Advice;
}

export default function Home() {
  const [type, setType] = useState<MarketType>("crypto");
  const [timeframe, setTimeframe] = useState<TF>("1D");
  const [symbol, setSymbol] = useState("btc");

  const queryKey = useMemo(
    () => ["candles", type, symbol, timeframe] as const,
    [type, symbol, timeframe]
  );

  const candlesQ = useQuery<CandlesResponse, Error>({
    queryKey,
    queryFn: () => getCandles(type, symbol, timeframe),
    enabled: !!symbol,
  });

  const adviceM = useMutation<AdviceResponse, Error, void>({
    mutationFn: async () =>
      getAdvice({
        type,
        symbol,
        currency: "usd",
        days: 60,
        timeframe,
      }),
  });

  const candles = candlesQ.data?.candles ?? [];
  const src = candlesQ.data?.source;

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-4">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Market Tracker <Badge variant="secondary">MVP+</Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Select
              value={type}
              onValueChange={(v: string) => setType(v as MarketType)}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={timeframe}
              onValueChange={(v: string) => setTimeframe(v as TF)}
            >
              <SelectTrigger className="w-28">
                <SelectValue placeholder="TF" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1D">1D</SelectItem>
                <SelectItem value="1H">1H</SelectItem>
              </SelectContent>
            </Select>

            <Input
              className="w-64"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder={
                type === "crypto" ? "btc / eth / sol" : "aapl.us / tsla.us"
              }
            />

            <Button
              onClick={() => adviceM.mutate()}
              disabled={
                candlesQ.isLoading || adviceM.isPending || candles.length < 50
              }
            >
              GET Signal
            </Button>
          </div>

          <div className="text-sm opacity-70">
            Data source: <span className="font-medium">{src ?? "—"}</span>
          </div>

          <Separator />

          {candlesQ.isLoading ? (
            <div>Loading candles…</div>
          ) : candlesQ.isError ? (
            <div className="text-red-600">Error: {candlesQ.error.message}</div>
          ) : (
            <PriceChart data={candles} />
          )}

          <Separator />

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">Model signal</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              {adviceM.isPending ? (
                <div>Thinking...</div>
              ) : adviceM.data && "error" in adviceM.data ? (
                <div className="text-red-600">{adviceM.data.error}</div>
              ) : adviceM.data ? (
                <pre className="overflow-auto whitespace-pre-wrap">
                  {JSON.stringify(adviceM.data, null, 2)}
                </pre>
              ) : (
                <div className="opacity-70">Use risk management :)</div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </main>
  );
}
