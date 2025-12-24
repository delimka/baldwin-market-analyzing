import { RSI, SMA, MACD } from "technicalindicators";

export function computeIndicators(closes: number[]) {
  const rsi14 = RSI.calculate({ period: 14, values: closes });
  const sma20 = SMA.calculate({ period: 20, values: closes });
  const sma50 = SMA.calculate({ period: 50, values: closes });
  const macd = MACD.calculate({
    values: closes,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  });

  const last = <T>(arr: T[]) => (arr.length ? arr[arr.length - 1] : null);

  return {
    rsi14: last(rsi14),
    sma20: last(sma20),
    sma50: last(sma50),
    macd: last(macd), // {MACD, signal, histogram}
  };
}
