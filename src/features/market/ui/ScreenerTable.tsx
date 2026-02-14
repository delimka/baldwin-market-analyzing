import type { ScreenerItem } from "@/entities/market";

export function ScreenerTable({ items }: { items: ScreenerItem[] }) {
  return (
    <div className="overflow-auto rounded-md border">
      <table className="min-w-245 w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left p-2">#</th>
            <th className="text-left p-2">Symbol</th>
            <th className="text-right p-2">Price</th>
            <th className="text-right p-2">24h %</th>
            <th className="text-right p-2">Vol %</th>
            <th className="text-right p-2">News</th>
            <th className="text-right p-2">Score</th>
            <th className="text-left p-2">Why</th>
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
              <td className="p-2 opacity-80">{it.reasons.join(" Â· ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

