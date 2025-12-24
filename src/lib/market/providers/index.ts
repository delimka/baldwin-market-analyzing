import type { MarketProvider, ProviderParams } from "./base";
import { CoinGeckoProvider } from "./coingecko";
import { StooqProvider } from "./stooq";
import { BinanceProvider } from "./binance";

const providers: MarketProvider[] = [
  CoinGeckoProvider,
  BinanceProvider,

  StooqProvider,
];

export function pickProvider(p: ProviderParams): MarketProvider {
  const found = providers.find((pr) => pr.supports(p));
  if (!found) throw new Error("No providers for this params");
  return found;
}
