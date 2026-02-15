import { Hero } from "./ui/Hero";
import { CryptoCoverage } from "./ui/TrustedClients";
import FeaturesSection from "./ui/FeaturesSection";
import { PricingSection } from "./ui/PricingSection";
import { FaqSection } from "./ui/FaqSection";

export function MainPage() {
  return (
    <div className="flex flex-col gap-16 sm:gap-24">
      <Hero />

      <FeaturesSection />
      <CryptoCoverage />
      <PricingSection />
      <FaqSection />
    </div>
  );
}
