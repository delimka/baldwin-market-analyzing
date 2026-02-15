"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { Badge } from "@/shared/ui";
import { Button } from "@/shared/ui";
import { Separator } from "@/shared/ui";
import type { MarketType } from "@/entities/market";
import type { TF } from "@/entities/market";
import { DEFAULT_LANGUAGE, isSupportedLanguage, type SupportedLanguage } from "@/shared/i18n";
import { MarketControls } from "@/features/market";
import { SymbolPicker } from "@/features/market";
import { PriceChart } from "@/entities/market";
import { AdviceCard } from "@/features/advice";
import { useAdvice } from "@/features/advice";
import { useCandles } from "@/features/market";
import { Spinner } from "@/shared/components";

export function MarketTracker() {
  const { i18n, t } = useTranslation();
  const [type, setType] = useState<MarketType>("crypto");
  const [timeframe, setTimeframe] = useState<TF>("1D");
  const [symbol, setSymbol] = useState("btc");

  const candlesQ = useCandles({ type, symbol, timeframe });
  const adviceM = useAdvice();

  const candles = candlesQ.data?.candles ?? [];
  const src = candlesQ.data?.source;
  const lang: SupportedLanguage = isSupportedLanguage(i18n.resolvedLanguage)
    ? i18n.resolvedLanguage
    : DEFAULT_LANGUAGE;

  return (
    <div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t("marketTracker.title")} <Badge variant="secondary">MVP+</Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <MarketControls
              type={type}
              timeframe={timeframe}
              onTypeChange={setType}
              onTimeframeChange={setTimeframe}
              lang={lang}
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
              {t("marketTracker.getSignal")}
            </Button>
          </div>

          <div className="text-sm opacity-70">
            {t("marketTracker.dataSource")}:{" "}
            <span className="font-medium">{src ?? "-"}</span>
          </div>

          <Separator />

          {candlesQ.isLoading ? (
            <div className="flex min-h-56 items-center justify-center gap-3 rounded-xl border bg-background">
              <Spinner size={24} />
              <span className="text-sm text-muted-foreground">
                {t("marketTracker.loadingCandles")}
              </span>
            </div>
          ) : candlesQ.isError ? (
            <div className="text-red-600">
              {t("common.error")}: {candlesQ.error.message}
            </div>
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
