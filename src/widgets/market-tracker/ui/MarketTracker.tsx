"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/shadcn/card";
import { Badge } from "@/shared/ui/shadcn/badge";
import { Button } from "@/shared/ui/shadcn/button";
import { Separator } from "@/shared/ui/shadcn/separator";

import type { MarketType } from "@/entities/market/model/types";
import type { TF } from "@/shared/api/market";

import { MarketControls } from "@/features/market/ui/MarketControls";
import { SymbolPicker } from "@/features/market/ui/SymbolPicker";
import { PriceChart } from "@/entities/market/ui/PriceChart";
import { AdviceCard } from "@/features/advice/ui/AdviceCard";

import { useAdvice } from "@/features/advice/model/useAdvice";
import { useCandles } from "@/features/market/model/useCandles";
import { HeroBackground } from "@/widgets/main-page/ui/HeroBackground";

export function MarketTracker() {
  const [type, setType] = useState<MarketType>("crypto");
  const [timeframe, setTimeframe] = useState<TF>("1D");
  const [symbol, setSymbol] = useState("btc");
  const [lang, setLang] = useState("eng");

  const candlesQ = useCandles({ type, symbol, timeframe });
  const adviceM = useAdvice();

  const candles = candlesQ.data?.candles ?? [];
  const src = candlesQ.data?.source;

  return (
    <div>
      <Card className="bg-white rounded-2xl">
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
              lang={lang}
              onLangChange={setLang}
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
                  lang,
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
    </div>
  );
}
