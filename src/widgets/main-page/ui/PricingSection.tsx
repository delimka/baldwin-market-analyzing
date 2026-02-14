import { SectionTitle } from "@/shared/components";
import { pricingData } from "../model";
import { SparklesIcon } from "lucide-react";

export function PricingSection() {
  return (
    <section className="py-6">
      <SectionTitle
        text1="Pricing"
        text2="Clear plans for serious market work"
        text3="Choose a plan that fits your workflow, from quick checks to full-stack research."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {pricingData.map((plan) => (
          <div
            key={plan.title}
            className={[
              "relative flex h-full flex-col rounded-2xl border p-6 shadow-[0px_8px_30px] shadow-black/5",
              plan.mostPopular
                ? "bg-[linear-gradient(180deg,hsl(var(--primary))_0%,hsl(var(--primary)/0.55)_50%)] text-primary-foreground"
                : "bg-card text-card-foreground",
            ].join(" ")}
          >
            {plan.mostPopular && (
              <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-900">
                <SparklesIcon size={14} />
                Most popular
              </div>
            )}

            <p className="text-sm font-medium">{plan.title}</p>
            <h4 className="mt-2 text-3xl font-semibold">
              ${plan.price}
              <span
                className={[
                  "text-sm font-normal",
                  plan.mostPopular
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                /mo
              </span>
            </h4>

            <div
              className={[
                "my-6 h-px w-full",
                plan.mostPopular ? "bg-white/30" : "bg-border",
              ].join(" ")}
            />

            <div
              className={[
                "space-y-2 text-sm mb-8",
                plan.mostPopular
                  ? "text-primary-foreground/90"
                  : "text-muted-foreground",
              ].join(" ")}
            >
              {plan.features.map((feature) => (
                <div key={feature.name} className="flex items-center gap-2">
                  <feature.icon
                    size={18}
                    className={
                      plan.mostPopular
                        ? "text-primary-foreground"
                        : "text-primary"
                    }
                  />
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>

            <button
              className={[
                "mt-auto w-full rounded-lg py-3 text-sm font-medium transition",
                plan.mostPopular ? "bg-white text-slate-900" : "btn-primary",
              ].join(" ")}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}




