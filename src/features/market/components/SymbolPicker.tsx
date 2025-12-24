"use client";

import { useState } from "react";
import type { MarketType } from "@/entities/market/types";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { searchSymbols } from "@/shared/api/search";

export function SymbolPicker(props: {
  type: MarketType;
  value: string;
  onApply: (symbol: string) => void;
}) {
  return <SymbolPickerInner key={`${props.type}:${props.value}`} {...props} />;
}

function SymbolPickerInner(props: {
  type: MarketType;
  value: string;
  onApply: (symbol: string) => void;
}) {
  const [draft, setDraft] = useState(props.value);
  const debounced = useDebounce(draft.trim(), 250);

  const searchQ = useQuery({
    queryKey: ["symbol-search", props.type, debounced],
    queryFn: () => searchSymbols({ type: props.type, q: debounced }),
    enabled: props.type === "crypto" && debounced.length >= 2,
    staleTime: 60_000,
  });

  const apply = () => {
    const s = debounced.trim();
    if (s) props.onApply(s);
  };

  return (
    <div className="relative">
      <div className="flex gap-2 items-center">
        <Input
          className="w-64"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") apply();
          }}
          placeholder={
            props.type === "crypto" ? "btc / eth / sol" : "aapl.us / tsla.us"
          }
        />
        <Button
          type="button"
          variant="secondary"
          onClick={apply}
          disabled={!debounced.trim()}
        >
          Apply
        </Button>
      </div>

      {props.type === "crypto" && searchQ.data?.items?.length ? (
        <div className="absolute z-20 mt-2 w-64 rounded-xl border bg-background shadow">
          {searchQ.data.items.map((it) => (
            <button
              key={`${it.id ?? it.symbol}`}
              className="w-full text-left px-3 py-2 hover:bg-muted"
              onClick={() => props.onApply(it.symbol)}
            >
              <span className="font-medium">{it.symbol}</span>
              {it.name ? (
                <span className="opacity-70"> — {it.name}</span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
