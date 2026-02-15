"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { Button } from "@/shared/ui";
import { ScreenerControls } from "@/features/market";
import { ScreenerTable } from "@/features/market";
import { useScreener } from "@/features/market";
import type { ScreenerRequest } from "@/entities/market";

export function MarketScreener() {
  const { t } = useTranslation();
  const [controls, setControls] = useState<
    Pick<ScreenerRequest, "top" | "timeframe" | "withNews">
  >({
    top: 20,
    timeframe: "1H",
    withNews: false,
  });

  const [submitted, setSubmitted] = useState<typeof controls | null>(null);
  const [runId, setRunId] = useState(0);

  const params: ScreenerRequest | null = useMemo(() => {
    if (!submitted) return null;
    return {
      type: "crypto",
      top: submitted.top,
      timeframe: submitted.timeframe,
      days: submitted.timeframe === "1H" ? 7 : 60,
      universeSize: 20,
      liquidityPool: 200,
      withNews: submitted.withNews,
      runId,
    };
  }, [submitted, runId]);

  const q = useScreener(params);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRunId((x) => x + 1);
    setSubmitted({ ...controls });
  }

  return (
    <Card>
      <CardHeader className="space-y-3">
        <CardTitle>{t("marketScreener.title")}</CardTitle>

        <form onSubmit={onSubmit} className="flex flex-wrap items-center gap-2">
          <ScreenerControls value={controls} onChange={setControls} />
          <Button type="submit" disabled={q.isFetching}>
            {q.isFetching ? t("marketScreener.scanning") : t("marketScreener.runScan")}
          </Button>
        </form>

        <div className="text-xs opacity-60">
          {q.data?.asOf
            ? `${t("marketScreener.asOf")}: ${new Date(q.data.asOf).toLocaleString()}`
            : "-"}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {q.error ? (
          <div className="rounded-md border p-3">
            {t("common.error")}: {(q.error as Error)?.message ?? t("marketScreener.unknown")}
          </div>
        ) : null}

        <ScreenerTable items={q.data?.items ?? []} />
      </CardContent>
    </Card>
  );
}
