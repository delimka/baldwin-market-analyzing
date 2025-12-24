"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";

import type { MarketType } from "@/entities/market/types";
import type { TF } from "@/shared/api/market";

import { useCandles } from "@/features/market/hooks/useCandles";
import { useAdvice } from "@/features/advice/hooks/useAdvice";

import { MarketControls } from "@/features/market/components/MartketControls";
import { SymbolPicker } from "@/features/market/components/SymbolPicker";
import { PriceChart } from "@/features/market/components/PriceChart";
import { AdviceCard } from "@/features/advice/components/AdviceCard";

export default function Home() {
  const [type, setType] = useState<MarketType>("crypto");
  const [timeframe, setTimeframe] = useState<TF>("1D");
  const [symbol, setSymbol] = useState("btc"); // applied

  const candlesQ = useCandles({ type, symbol, timeframe });
  const adviceM = useAdvice();

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
          <div className="flex flex-wrap gap-2 items-center">
            <MarketControls
              type={type}
              timeframe={timeframe}
              onTypeChange={setType}
              onTimeframeChange={setTimeframe}
            />

            <SymbolPicker type={type} value={symbol} onApply={setSymbol} />

            <Button
              onClick={() =>
                adviceM.mutate({
                  type,
                  symbol,
                  timeframe,
                  days: 60,
                  currency: "usd",
                })
              }
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

          <AdviceCard
            pending={adviceM.isPending}
            data={adviceM.data ?? null}
            error={adviceM.error?.message ?? null}
          />
        </CardContent>
      </Card>
    </main>
  );
}
