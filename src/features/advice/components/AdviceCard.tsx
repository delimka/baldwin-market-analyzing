"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import type { Advice } from "@/lib/openai/schemas/adviceSchema";

type Action = Advice["recommendation"]["action"];

function actionStyles(action: Action) {
  switch (action) {
    case "BUY":
      return { chip: "bg-green-600 text-white", ring: "ring-green-600/20" };
    case "SELL":
      return { chip: "bg-red-600 text-white", ring: "ring-red-600/20" };
    case "HOLD":
      return { chip: "bg-blue-600 text-white", ring: "ring-blue-600/20" };
    case "WATCH":
    default:
      return { chip: "bg-yellow-500 text-black", ring: "ring-yellow-500/20" };
  }
}

function fmtNum(x: number | null) {
  if (x === null) return "—";
  // компактно и “биржево”
  const abs = Math.abs(x);
  if (abs >= 1000) return x.toFixed(0);
  if (abs >= 100) return x.toFixed(2);
  if (abs >= 1) return x.toFixed(4);
  return x.toPrecision(6);
}

function horizonLabel(h: Advice["recommendation"]["horizon"]) {
  switch (h) {
    case "intraday":
      return "Intraday";
    case "swing":
      return "Swing";
    case "long_term":
      return "Long-term";
  }
}

export function AdviceCard(props: {
  pending: boolean;
  data: Advice | null;
  error?: string | null;
}) {
  const { pending, error, data } = props;
  const [showDetails, setShowDetails] = useState(false);

  const confPct = useMemo(() => {
    if (!data) return 0;
    return Math.max(
      0,
      Math.min(100, Math.round(data.recommendation.confidence * 100))
    );
  }, [data]);

  const a = data?.recommendation.action;
  const styles = a ? actionStyles(a) : null;

  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-base flex items-center gap-2">
              Model signal
              {data ? (
                <Badge variant="secondary" className="font-normal">
                  {data.asset.type.toUpperCase()} · {data.timeframe}
                </Badge>
              ) : null}
            </CardTitle>

            {data ? (
              <div className="mt-1 text-xs opacity-70 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-medium opacity-90">
                  {data.asset.symbol.toUpperCase()}
                </span>
                <span>· {data.asset.currency.toUpperCase()}</span>
                <span className="opacity-60">·</span>
                <span className="opacity-80">Source: {data.asset.source}</span>
              </div>
            ) : (
              <div className="mt-1 text-xs opacity-70">
                Educational signal (not financial advice)
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

        {/* status row */}
        {pending ? (
          <div className="text-sm opacity-80">Thinking…</div>
        ) : error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : data ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl border bg-background p-3">
              <div className="text-xs opacity-70">Confidence</div>
              <div className="mt-1 flex items-end justify-between gap-2">
                <div className="text-lg font-semibold">{confPct}%</div>
                <div className="text-xs opacity-70">
                  {horizonLabel(data.recommendation.horizon)}
                </div>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${confPct}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border bg-background p-3">
              <div className="text-xs opacity-70">Levels</div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-lg bg-muted p-2">
                  <div className="opacity-70">Entry</div>
                  <div className="font-medium">{fmtNum(data.levels.entry)}</div>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <div className="opacity-70">Take</div>
                  <div className="font-medium">
                    {fmtNum(data.levels.take_profit)}
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <div className="opacity-70">Stop</div>
                  <div className="font-medium">
                    {fmtNum(data.levels.stop_loss)}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-background p-3">
              <div className="text-xs opacity-70">Risk</div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <div className="text-lg font-semibold">
                  ≤ {data.risk_management.max_risk_pct}%
                </div>
                <Badge variant="secondary" className="text-xs">
                  Risk mgmt
                </Badge>
              </div>
              <div className="mt-2 text-xs opacity-80 line-clamp-3">
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
            {/* pros/cons/risks */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="rounded-xl border bg-background p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-green-700">Bullish</div>
                  <Badge variant="secondary" className="text-xs">
                    {data.rationale.bullish.length}
                  </Badge>
                </div>
                <ul className="mt-2 space-y-1 text-xs opacity-90">
                  {data.rationale.bullish
                    .slice(0, showDetails ? 999 : 3)
                    .map((b, i) => (
                      <li key={i} className="leading-relaxed">
                        • {b}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="rounded-xl border bg-background p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-red-700">Bearish</div>
                  <Badge variant="secondary" className="text-xs">
                    {data.rationale.bearish.length}
                  </Badge>
                </div>
                <ul className="mt-2 space-y-1 text-xs opacity-90">
                  {data.rationale.bearish
                    .slice(0, showDetails ? 999 : 3)
                    .map((b, i) => (
                      <li key={i} className="leading-relaxed">
                        • {b}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="rounded-xl border bg-background p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-yellow-700">Risks</div>
                  <Badge variant="secondary" className="text-xs">
                    {data.rationale.risks.length}
                  </Badge>
                </div>
                <ul className="mt-2 space-y-1 text-xs opacity-90">
                  {data.rationale.risks
                    .slice(0, showDetails ? 999 : 3)
                    .map((r, i) => (
                      <li key={i} className="leading-relaxed">
                        • {r}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* next checks */}
            {data.next_checks.length ? (
              <div className="rounded-xl border bg-background p-3">
                <div className="font-medium">Next checks</div>
                <ul className="mt-2 space-y-1 text-xs opacity-90">
                  {data.next_checks
                    .slice(0, showDetails ? 999 : 4)
                    .map((n, i) => (
                      <li key={i} className="leading-relaxed">
                        • {n}
                      </li>
                    ))}
                </ul>
              </div>
            ) : null}

            {/* footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <button
                type="button"
                className="text-xs opacity-70 hover:opacity-100 underline underline-offset-4 w-fit"
                onClick={() => setShowDetails((v) => !v)}
              >
                {showDetails ? "Hide details" : "Show more"}
              </button>

              <div className="text-xs opacity-60 italic line-clamp-2">
                {data.disclaimer}
              </div>
            </div>
          </>
        ) : (
          <div className="opacity-70">
            {pending
              ? "Thinking…"
              : error
              ? "Fix the error above and try again."
              : "Use risk management 🙂"}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
