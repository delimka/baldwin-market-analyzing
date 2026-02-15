import { CheckIcon } from "lucide-react";

export const pricingData = [
  {
    titleKey: "pricing.plans.starter.title",
    price: 19,
    features: [
      { nameKey: "pricing.plans.starter.features.watchlist", icon: CheckIcon },
      { nameKey: "pricing.plans.starter.features.basicScreeners", icon: CheckIcon },
      { nameKey: "pricing.plans.starter.features.emailSupport", icon: CheckIcon },
      { nameKey: "pricing.plans.starter.features.dailyBrief", icon: CheckIcon },
    ],
    buttonTextKey: "pricing.plans.starter.button",
  },
  {
    titleKey: "pricing.plans.pro.title",
    price: 69,
    mostPopular: true,
    features: [
      { nameKey: "pricing.plans.pro.features.unlimitedWatchlists", icon: CheckIcon },
      { nameKey: "pricing.plans.pro.features.aiSummaries", icon: CheckIcon },
      { nameKey: "pricing.plans.pro.features.prioritySupport", icon: CheckIcon },
      { nameKey: "pricing.plans.pro.features.backtestSnapshots", icon: CheckIcon },
      { nameKey: "pricing.plans.pro.features.multiMarket", icon: CheckIcon },
    ],
    buttonTextKey: "pricing.plans.pro.button",
  },
  {
    titleKey: "pricing.plans.enterprise.title",
    price: 149,
    features: [
      { nameKey: "pricing.plans.enterprise.features.customIntegrations", icon: CheckIcon },
      { nameKey: "pricing.plans.enterprise.features.dedicatedSuccess", icon: CheckIcon },
      { nameKey: "pricing.plans.enterprise.features.slaReports", icon: CheckIcon },
      { nameKey: "pricing.plans.enterprise.features.teamPermissions", icon: CheckIcon },
      { nameKey: "pricing.plans.enterprise.features.securityReview", icon: CheckIcon },
    ],
    buttonTextKey: "pricing.plans.enterprise.button",
  },
];
