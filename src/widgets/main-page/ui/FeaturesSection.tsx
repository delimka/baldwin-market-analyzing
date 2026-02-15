"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "@/shared/components";

export default function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-6">
      <SectionTitle
        text1={t("features.overline")}
        text2={t("features.title")}
        text3={t("features.subtitle")}
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="group rounded-2xl border bg-background p-4 transition duration-300 hover:-translate-y-0.5">
          <Image
            className="h-52 w-full rounded-xl object-cover transition duration-300 group-hover:scale-[1.02]"
            src="/features/feature-1.webp"
            alt="AI market signal visualization"
            height={400}
            width={400}
          />
          <h3 className="mt-4 text-base font-semibold text-foreground">
            {t("features.items.momentum.title")}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("features.items.momentum.description")}
          </p>
        </div>
        <div className="group rounded-2xl border bg-background p-4 transition duration-300 hover:-translate-y-0.5">
          <Image
            className="h-52 w-full rounded-xl object-cover transition duration-300 group-hover:scale-[1.02]"
            src="/features/feature-2.webp"
            alt="AI network and prediction lattice"
            height={400}
            width={400}
          />
          <h3 className="mt-4 text-base font-semibold text-foreground">
            {t("features.items.ai.title")}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("features.items.ai.description")}
          </p>
        </div>
        <div className="group rounded-2xl border bg-background p-4 transition duration-300 hover:-translate-y-0.5">
          <Image
            className="h-52 w-full rounded-xl object-cover transition duration-300 group-hover:scale-[1.02]"
            src="/features/feature-3.webp"
            alt="Cross-market flow visualization"
            height={400}
            width={400}
          />
          <h3 className="mt-4 text-base font-semibold text-foreground">
            {t("features.items.flow.title")}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("features.items.flow.description")}
          </p>
        </div>
      </div>
    </section>
  );
}
