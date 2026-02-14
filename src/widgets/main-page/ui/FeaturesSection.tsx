import Image from "next/image";
import { SectionTitle } from "@/shared/components";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-6">
      <SectionTitle
        text1="Features"
        text2="A clearer path from scan to signal"
        text3="Focused dashboards and AI insights to help you move fast without the noise."
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
            Momentum snapshots
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Spot fast moves, volume shifts, and trend changes in seconds.
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
            AI-guided analysis
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Ask for trade context and receive clear, explainable guidance.
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
            Cross-market flow
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Track crypto and stocks together with a unified watchlist.
          </p>
        </div>
      </div>
    </section>
  );
}


