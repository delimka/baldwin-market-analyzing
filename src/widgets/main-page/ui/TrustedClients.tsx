"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useCryptoLogos } from "../model";

function FallbackLogos() {
  const fallback = [
    "BTC",
    "ETH",
    "SOL",
    "BNB",
    "XRP",
    "ADA",
    "DOGE",
    "DOT",
    "AVAX",
    "LINK",
  ];

  return (
    <div className="flex items-center gap-3 px-6">
      {fallback.map((symbol) => (
        <span
          key={symbol}
          className="rounded-full border border-border/70 px-3 py-1 text-xs font-semibold text-muted-foreground"
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}

export function CryptoCoverage() {
  const logosQ = useCryptoLogos(20);
  const items = logosQ.data?.items ?? [];

  return (
    <section className="py-6">
      <div className="text-center">
        <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Market Coverage
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Track the most watched crypto assets with live.
        </p>
      </div>

      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-16 lg:w-20 bg-linear-to-r from-[hsl(var(--background))] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-16 lg:w-20 bg-linear-to-l from-[hsl(var(--background))] to-transparent" />

        <Marquee speed={30} gradient={false} pauseOnHover autoFill>
          <div className="flex items-center">
            {items.length ? (
              items.map((coin) => (
                <div
                  key={coin.id}
                  className="mx-8 flex items-center gap-2 opacity-75 transition hover:opacity-100"
                  title={`${coin.name} (${coin.symbol})`}
                  aria-label={coin.name}
                >
                  <Image
                    src={coin.large || coin.thumb}
                    alt={coin.name}
                    width={40}
                    height={40}
                    unoptimized
                    className="rounded-full"
                  />
                  <span className="text-xs font-medium text-muted-foreground">
                    {coin.symbol}
                  </span>
                </div>
              ))
            ) : (
              <FallbackLogos />
            )}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
