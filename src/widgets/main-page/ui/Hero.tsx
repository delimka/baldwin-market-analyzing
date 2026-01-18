import Link from "next/link";
import { Badge } from "@/shared/ui/shadcn/badge";
import { Button } from "@/shared/ui/shadcn/button";
import { Card } from "@/shared/ui/shadcn/card";

const stats = [
  { label: "Markets", value: "Crypto + Stocks" },
  { label: "Signals", value: "BUY / SELL / HOLD" },
  { label: "Latency", value: "Low-friction" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-[32px] border bg-[radial-gradient(1200px_circle_at_10%_10%,hsl(var(--muted))_0%,transparent_55%),radial-gradient(900px_circle_at_90%_20%,hsl(var(--primary)/0.12)_0%,transparent_50%),linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background))_60%,hsl(var(--muted))_100%)]">
      <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-transparent blur-2xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 left-10 size-72 rounded-full bg-gradient-to-tr from-orange-400/20 via-amber-300/10 to-transparent blur-3xl animate-float-slower" />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="animate-fade-up">
          <Badge variant="secondary">AI market assistant</Badge>
          <h1
            className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl"
            style={{
              fontFamily:
                '"Fraunces","Iowan Old Style","Palatino Linotype",serif',
            }}
          >
            See the market as a clean signal, not a noisy feed.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Track candles, scan movers, and request explainable advice with a
            single click. Designed for fast decisions and calm UI.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/market-tracker">Start tracking</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/market-screener">Run screener</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3" id="features">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border bg-background/70 px-4 py-3 shadow-sm backdrop-blur"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </div>
                <div className="mt-2 text-sm font-semibold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 animate-fade-up animate-fade-up-delay-2">
          <Card className="relative overflow-hidden border-none bg-background/80 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Signal</div>
                <div className="mt-1 text-xl font-semibold">WATCH</div>
              </div>
              <Badge className="bg-amber-500/90 text-black">Low risk</Badge>
            </div>
            <div className="mt-5 h-24 w-full rounded-2xl border bg-gradient-to-r from-muted/60 via-muted to-muted/60 p-3">
              <div className="flex h-full items-end justify-between gap-2">
                {[12, 24, 18, 28, 20, 32, 22, 34].map((h, i) => (
                  <div
                    key={i}
                    className="w-full rounded-full bg-primary/70"
                    style={{ height: `${h + 18}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-3 text-xs text-muted-foreground sm:grid-cols-2">
              <div className="rounded-xl border bg-background px-3 py-2">
                Confidence 62%
              </div>
              <div className="rounded-xl border bg-background px-3 py-2">
                Horizon 1D
              </div>
            </div>
          </Card>

          <Card className="grid gap-2 border bg-background/70 p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Latest scan</span>
              <span id="insights">Top 5 movers</span>
            </div>
            <div className="grid gap-2">
              {[
                { symbol: "BTC", move: "+3.2%" },
                { symbol: "SOL", move: "+2.7%" },
                { symbol: "ETH", move: "+1.9%" },
              ].map((item) => (
                <div
                  key={item.symbol}
                  className="flex items-center justify-between rounded-xl border bg-background px-3 py-2 text-sm"
                >
                  <span className="font-semibold">{item.symbol}</span>
                  <span className="text-emerald-600">{item.move}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
