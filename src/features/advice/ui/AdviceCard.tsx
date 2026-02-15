"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { Badge } from "@/shared/ui";
import { Loader } from "@/shared/ui";
import { Separator } from "@/shared/ui";
import type { Advice } from "@/entities/advice";
import {
  ADVICE_CHECKS_PREVIEW_LIMIT,
  ADVICE_ITEMS_ALL_LIMIT,
  ADVICE_ITEMS_PREVIEW_LIMIT,
  formatLevelValue,
  getActionStyles,
  getConfidencePercent,
  getHorizonKey,
} from "@/features/advice/lib/presentation";

export function AdviceCard(props: {
  pending: boolean;
  data: Advice | null;
  error?: string | null;
}) {
  const { t } = useTranslation();
  const { pending, error, data } = props;
  const [showDetails, setShowDetails] = useState(false);
  const confPct = getConfidencePercent(data);

  const a = data?.recommendation.action;
  const styles = a ? getActionStyles(a) : null;

  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-base">
              {t("advice.modelSignal")}
              {data ? (
                <Badge variant="secondary" className="font-normal">
                  {data.asset.type.toUpperCase()} · {data.timeframe}
                </Badge>
              ) : null}
            </CardTitle>

            {data ? (
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs opacity-70">
                <span className="font-medium opacity-90">
                  {data.asset.symbol.toUpperCase()}
                </span>
                <span>· {data.asset.currency.toUpperCase()}</span>
                <span className="opacity-80">
                  {t("advice.source")}: {data.asset.source}
                </span>
              </div>
            ) : (
              <div className="mt-1 text-xs opacity-70">
                {t("advice.educationalSignal")}
              </div>
            )}
          </div>

          {data && styles ? (
            <div className="shrink-0">
              <Badge
                className={[
                  "px-3 py-1 text-xs font-semibold tracking-wide",
                  styles.chip,
                  "ring-4",
                  styles.ring,
                ].join(" ")}
              >
                {data.recommendation.action}
              </Badge>
            </div>
          ) : null}
        </div>

        {pending ? (
          <div className="flex items-center gap-2 text-sm opacity-80">
            <Loader size={16} />
            <span>{t("advice.analyzing")}</span>
          </div>
        ) : error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : data ? (
          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-xl border bg-background p-3">
              <div className="text-xs opacity-70">{t("advice.confidence")}</div>
              <div className="mt-1 flex items-end justify-between gap-2">
                <div className="text-lg font-semibold">{confPct}%</div>
                <div className="text-xs opacity-70">
                  {t(getHorizonKey(data.recommendation.horizon))}
                </div>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${confPct}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border bg-background p-3">
              <div className="text-xs opacity-70">{t("advice.levels")}</div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-lg bg-muted p-2">
                  <div className="opacity-70">{t("advice.entry")}</div>
                  <div className="font-medium">
                    {formatLevelValue(data.levels.entry)}
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <div className="opacity-70">{t("advice.take")}</div>
                  <div className="font-medium">
                    {formatLevelValue(data.levels.take_profit)}
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <div className="opacity-70">{t("advice.stop")}</div>
                  <div className="font-medium">
                    {formatLevelValue(data.levels.stop_loss)}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-background p-3">
              <div className="text-xs opacity-70">{t("advice.risk")}</div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <div className="text-lg font-semibold">
                  {data.risk_management.max_risk_pct}%
                </div>
                <Badge variant="secondary" className="text-xs">
                  {t("advice.riskMgmt")}
                </Badge>
              </div>
              <div className="mt-2 line-clamp-3 text-xs opacity-80">
                {data.risk_management.note}
              </div>
            </div>
          </div>
        ) : null}
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        <Separator />

        {!pending && !error && data ? (
          <>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              <div className="rounded-xl border bg-background p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-green-700">
                    {t("advice.bullish")}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {data.rationale.bullish.length}
                  </Badge>
                </div>
                <ul className="mt-2 space-y-1 text-xs opacity-90">
                  {data.rationale.bullish
                    .slice(
                      0,
                      showDetails
                        ? ADVICE_ITEMS_ALL_LIMIT
                        : ADVICE_ITEMS_PREVIEW_LIMIT,
                    )
                    .map((b, i) => (
                      <li key={i} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="rounded-xl border bg-background p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-red-700">
                    {t("advice.bearish")}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {data.rationale.bearish.length}
                  </Badge>
                </div>
                <ul className="mt-2 space-y-1 text-xs opacity-90">
                  {data.rationale.bearish
                    .slice(
                      0,
                      showDetails
                        ? ADVICE_ITEMS_ALL_LIMIT
                        : ADVICE_ITEMS_PREVIEW_LIMIT,
                    )
                    .map((b, i) => (
                      <li key={i} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="rounded-xl border bg-background p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-yellow-700">
                    {t("advice.risks")}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {data.rationale.risks.length}
                  </Badge>
                </div>
                <ul className="mt-2 space-y-1 text-xs opacity-90">
                  {data.rationale.risks
                    .slice(
                      0,
                      showDetails
                        ? ADVICE_ITEMS_ALL_LIMIT
                        : ADVICE_ITEMS_PREVIEW_LIMIT,
                    )
                    .map((r, i) => (
                      <li key={i} className="leading-relaxed">
                        {r}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {data.next_checks.length ? (
              <div className="rounded-xl border bg-background p-3">
                <div className="font-medium">{t("advice.nextChecks")}</div>
                <ul className="mt-2 space-y-1 text-xs opacity-90">
                  {data.next_checks
                    .slice(
                      0,
                      showDetails
                        ? ADVICE_ITEMS_ALL_LIMIT
                        : ADVICE_CHECKS_PREVIEW_LIMIT,
                    )
                    .map((n, i) => (
                      <li key={i} className="leading-relaxed">
                        {n}
                      </li>
                    ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                className="w-fit text-xs opacity-70 underline underline-offset-4 hover:opacity-100"
                onClick={() => setShowDetails((v) => !v)}
              >
                {showDetails ? t("advice.hideDetails") : t("advice.showMore")}
              </button>

              <div className="line-clamp-2 text-xs italic opacity-60">
                {data.disclaimer}
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-xl border bg-background p-6">
            {pending ? (
              <div className="flex min-h-20 items-center justify-center gap-3">
                <Loader size={22} />
                <span className="text-sm text-muted-foreground">
                  {t("advice.buildingAdvice")}
                </span>
              </div>
            ) : (
              <div className="opacity-70">
                {error
                  ? t("advice.fixAndRetry")
                  : t("advice.useRiskManagement")}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
