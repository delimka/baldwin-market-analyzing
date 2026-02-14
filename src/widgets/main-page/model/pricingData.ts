import { CheckIcon } from "lucide-react";

export const pricingData = [
  {
    title: "Starter",
    price: 19,
    features: [
      { name: "Watchlist + alerts", icon: CheckIcon },
      { name: "Basic screeners", icon: CheckIcon },
      { name: "Email support", icon: CheckIcon },
      { name: "Daily market brief", icon: CheckIcon },
    ],
    buttonText: "Start free",
  },
  {
    title: "Pro",
    price: 69,
    mostPopular: true,
    features: [
      { name: "Unlimited watchlists", icon: CheckIcon },
      { name: "AI signal summaries", icon: CheckIcon },
      { name: "Priority support", icon: CheckIcon },
      { name: "Backtest snapshots", icon: CheckIcon },
      { name: "Multi-market coverage", icon: CheckIcon },
    ],
    buttonText: "Upgrade now",
  },
  {
    title: "Enterprise",
    price: 149,
    features: [
      { name: "Custom integrations", icon: CheckIcon },
      { name: "Dedicated success", icon: CheckIcon },
      { name: "SLA + uptime reports", icon: CheckIcon },
      { name: "Team permissions", icon: CheckIcon },
      { name: "Security review", icon: CheckIcon },
    ],
    buttonText: "Contact sales",
  },
];
