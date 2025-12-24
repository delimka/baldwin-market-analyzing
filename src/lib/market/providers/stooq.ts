import Papa from "papaparse";
import type { Candle, StooqRow } from "../types";
import type { MarketProvider, ProviderParams } from "./base";

export const StooqProvider: MarketProvider = {
  name: "stooq",
  supports(p: ProviderParams) {
    return p.type === "stock" && (p.timeframe ?? "1D") === "1D";
  },
  async fetchCandles(p: ProviderParams): Promise<Candle[]> {
    const sym = p.symbol.toLowerCase(); // aapl.us
    const url = `https://stooq.com/q/d/l/?s=${encodeURIComponent(sym)}&i=d`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Stooq: error CSV");

    const csv = await res.text();
    const parsed = Papa.parse<StooqRow>(csv, {
      header: true,
      skipEmptyLines: true,
    });
    // parsed.data === [
    // {
    //     Date: "2024-01-02",
    //     Open: "185.64",
    //     High: "188.44",
    //     Low: "183.89",
    //     Close: "187.15",
    //     Volume: "11223344"
    // },
    const rows = parsed.data;

    return rows
      .map((r) => ({
        t: new Date(r.Date).getTime(),
        close: Number(r.Close),
      }))
      .filter((c) => Number.isFinite(c.close));
  },
};
