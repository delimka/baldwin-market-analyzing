import { NextResponse } from "next/server";
import { z } from "zod";

const Q = z.object({
  q: z.string().min(1).default("coin"),
  limit: z.coerce.number().min(5).max(30).default(20),
});

type CoinGeckoSearchResponse = {
  coins?: Array<{
    id: string;
    symbol: string;
    name: string;
    market_cap_rank?: number | null;
    thumb?: string;
    large?: string;
  }>;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = Q.parse({
    q: url.searchParams.get("q") ?? "coin",
    limit: url.searchParams.get("limit") ?? "20",
  });

  const res = await fetch(
    `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(params.q)}`,
    { next: { revalidate: 86_400 } },
  );

  if (!res.ok) {
    return NextResponse.json(
      { items: [], error: "CoinGecko logo search failed" },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  }

  const data = (await res.json()) as CoinGeckoSearchResponse;
  const items = (data.coins ?? [])
    .filter((coin) => coin.thumb || coin.large)
    .sort((a, b) => (a.market_cap_rank ?? 9_999) - (b.market_cap_rank ?? 9_999))
    .slice(0, params.limit)
    .map((coin) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      marketCapRank: coin.market_cap_rank ?? null,
      thumb: coin.thumb ?? coin.large ?? "",
      large: coin.large ?? coin.thumb ?? "",
    }));

  return NextResponse.json(
    { items },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
