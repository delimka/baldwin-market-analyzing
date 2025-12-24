import { NextResponse } from "next/server";
import { z } from "zod";

const Q = z.object({
  type: z.enum(["crypto", "stock"]),
  q: z.string().min(1),
});

type CoinGeckoSearchResponse = {
  coins?: Array<{
    id: string;
    symbol: string;
    name: string;
  }>;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = Q.parse({
    type: url.searchParams.get("type"),
    q: url.searchParams.get("q"),
  });

  if (params.type === "crypto") {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(
        params.q
      )}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { items: [], error: "CoinGecko search failed" },
        { status: 200 }
      );
    }

    const data = (await res.json()) as CoinGeckoSearchResponse;

    const coins = (data.coins ?? []).slice(0, 20).map((c) => ({
      id: c.id,
      symbol: c.symbol.toLowerCase(),
      name: c.name,
    }));
    console.log("search out as CoinGeckoSearchResponse", data);
    return NextResponse.json({ items: coins });
  }

  return NextResponse.json({ items: [] });
}
