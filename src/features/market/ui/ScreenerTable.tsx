"use client";

import { useTranslation } from "react-i18next";
import type { ScreenerItem } from "@/entities/market";

export function ScreenerTable({ items }: { items: ScreenerItem[] }) {
  const { t } = useTranslation();

  return (
    <div className="overflow-auto rounded-md border">
      <table className="min-w-245 w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">{t("screenerTable.symbol")}</th>
            <th className="p-2 text-right">{t("screenerTable.price")}</th>
            <th className="p-2 text-right">24h %</th>
            <th className="p-2 text-right">{t("screenerTable.volume")}</th>
            <th className="p-2 text-right">{t("screenerTable.news")}</th>
            <th className="p-2 text-right">{t("screenerTable.score")}</th>
            <th className="p-2 text-left">{t("screenerTable.why")}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <tr key={it.symbol} className="border-t">
              <td className="p-2">{idx + 1}</td>
              <td className="p-2 font-medium">{it.symbol}</td>
              <td className="p-2 text-right">{it.price}</td>
              <td className="p-2 text-right">{it.change24hPct.toFixed(2)}%</td>
              <td className="p-2 text-right">{it.volatilityPct.toFixed(2)}%</td>
              <td className="p-2 text-right">
                {it.newsCount} ({it.newsSentiment.toFixed(2)})
              </td>
              <td className="p-2 text-right">{it.score.toFixed(3)}</td>
              <td className="p-2 opacity-80">{it.reasons.join(" | ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
