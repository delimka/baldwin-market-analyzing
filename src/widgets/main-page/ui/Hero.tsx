"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui";
import { Card } from "@/shared/ui";
import { HeroBackground } from "@/shared/components";

export function Hero() {
  const { t } = useTranslation();

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
          {t("hero.title")}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {t("hero.subtitle")}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button className="btn-primary shadow-sm" asChild>
            <Link href="/market-tracker">{t("hero.startTracking")}</Link>
          </Button>
          <Button className="btn-secondary shadow-sm" asChild>
            <Link href="/market-screener">{t("hero.runScreener")}</Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Card className="border border-border/70 p-4 shadow-sm backdrop-blur-[3px]">
            <div className="text-xs text-muted-foreground">
              {t("hero.cards.timeframes")}
            </div>
            <div className="mt-1 text-lg font-semibold">
              {t("hero.cards.timeframesValue")}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {t("hero.cards.timeframesDesc")}
            </div>
          </Card>
          <Card className="border border-border/70 p-4 shadow-sm backdrop-blur-[3px]">
            <div className="text-xs text-muted-foreground">
              {t("hero.cards.signals")}
            </div>
            <div className="mt-1 text-lg font-semibold">
              {t("hero.cards.signalsValue")}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {t("hero.cards.signalsDesc")}
            </div>
          </Card>
          <Card className="border border-border/70 p-4 shadow-sm backdrop-blur-[3px]">
            <div className="text-xs text-muted-foreground">
              {t("hero.cards.sources")}
            </div>
            <div className="mt-1 text-lg font-semibold">
              {t("hero.cards.sourcesValue")}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {t("hero.cards.sourcesDesc")}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
