import Link from "next/link";
import { Badge } from "@/shared/ui/shadcn/badge";
import { Separator } from "@/shared/ui/shadcn/separator";

export function Footer() {
  return (
    <footer className="border-t" id="about">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-md bg-primary/90" />
              <span className="font-semibold tracking-tight">BaldWin</span>
              <Badge variant="secondary">Market</Badge>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Built for fast signal checks, clean charts, and practical market
              workflows.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <Link className="text-muted-foreground hover:text-foreground" href="/">
              Home
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="/market-tracker"
            >
              Market tracker
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="/market-screener"
            >
              Market screener
            </Link>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} BaldWin Market Analyzer</span>
          <span id="insights">Signals are educational, not financial advice.</span>
        </div>
      </div>
    </footer>
  );
}
