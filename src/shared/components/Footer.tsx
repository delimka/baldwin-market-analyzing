"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/shared/ui";
import { GridBackground } from "@/shared/components";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className="relative overflow-hidden border-t bg-[radial-gradient(1200px_circle_at_20%_0%,hsl(var(--muted))_0%,transparent_60%)]"
      id="about"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.35), rgba(0,0,0,0))",
        }}
      >
        <GridBackground
          className="h-full w-full translate-x-4 lg:translate-x-24 text-muted-foreground/25"
          strokeOpacity={0.18}
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Image
                src="/logo.webp"
                alt="BaldWin logo"
                width={140}
                height={32}
                className="h-15 w-auto"
              />
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
          </div>

          <div className="grid gap-6 text-sm sm:grid-cols-2">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t("footer.product")}
              </div>
              <div className="grid gap-2">
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="/market-tracker"
                >
                  {t("footer.marketTracker")}
                </Link>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="/market-screener"
                >
                  {t("footer.marketScreener")}
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t("footer.company")}
              </div>
              <div className="grid gap-2">
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="/"
                >
                  {t("footer.home")}
                </Link>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="#insights"
                >
                  {t("footer.insights")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>(c) {new Date().getFullYear()} BaldWin</span>
        </div>
      </div>
    </footer>
  );
}
