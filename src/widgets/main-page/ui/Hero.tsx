import Link from "next/link";
import { Button } from "@/shared/ui/shadcn/button";
import { Card } from "@/shared/ui/shadcn/card";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl bg-card">
      <HeroBackground />

      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <h1
          className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl"
          style={{
            fontFamily:
              '"Fraunces","Iowan Old Style","Palatino Linotype",serif',
          }}
        >
          Signal-first market intelligence for crypto and stocks
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Track candles, scan movers, and request AI-backed insights with clear
          rationale. Built for fast checks and calm decision-making.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button className="btn-primary shadow-sm" asChild>
            <Link href="/market-tracker">Start tracking</Link>
          </Button>
          <Button className="btn-secondary shadow-sm" asChild>
            <Link href="/market-screener">Run screener</Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Card className="border border-border/70  p-4 shadow-sm backdrop-blur-[3px]">
            <div className="text-xs text-muted-foreground">Timeframes</div>
            <div className="mt-1 text-lg font-semibold">1H and 1D</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Toggle between intraday and daily views quickly.
            </div>
          </Card>
          <Card className="border border-border/70  p-4 shadow-sm backdrop-blur-[3px]">
            <div className="text-xs text-muted-foreground">Signals</div>
            <div className="mt-1 text-lg font-semibold">Actionable</div>
            <div className="mt-1 text-sm text-muted-foreground">
              BUY, SELL, HOLD, WATCH with confidence and rationale.
            </div>
          </Card>
          <Card className="border border-border/70  p-4 shadow-sm backdrop-blur-[3px]">
            <div className="text-xs text-muted-foreground">Sources</div>
            <div className="mt-1 text-lg font-semibold">Multi-provider</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Binance, CoinGecko, and Stooq coverage.
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
