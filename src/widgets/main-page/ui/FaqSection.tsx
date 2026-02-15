"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "@/shared/components";
import { faqsData } from "../model";

export function FaqSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-6">
      <div className="mx-auto max-w-2xl">
        <SectionTitle
          text1={t("faq.overline")}
          text2={t("faq.title")}
          text3={t("faq.subtitle")}
        />

        <div className="mt-8 space-y-4">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <button
                key={faq.questionKey}
                type="button"
                className="w-full rounded-2xl border bg-card p-4 text-left transition hover:border-primary/40"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-medium text-foreground">
                    {t(faq.questionKey)}
                  </h3>
                  <ChevronDown
                    size={18}
                    className={[
                      "shrink-0 text-muted-foreground transition-transform duration-300",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </div>
                <p
                  className={[
                    "text-sm text-muted-foreground transition-all duration-300",
                    isOpen
                      ? "mt-3 max-h-40 opacity-100"
                      : "mt-0 max-h-0 opacity-0",
                  ].join(" ")}
                >
                  {t(faq.answerKey)}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
