"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MarketType } from "@/entities/market/types";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { searchSymbols } from "@/shared/api/search";

type Props = {
  type: MarketType;
  value: string;
  onApply: (symbol: string) => void;
};

export function SymbolPicker(props: Props) {
  return <SymbolPickerInner key={`${props.type}:${props.value}`} {...props} />;
}

function SymbolPickerInner({ type, value, onApply }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [draft, setDraft] = useState(value);
  const [focused, setFocused] = useState(false);

  const [highlightRaw, setHighlightRaw] = useState<number>(-1);

  const q = useDebounce(draft.trim().toLowerCase(), 250);
  const enabled = type === "crypto" && q.length >= 2;

  const searchQ = useQuery({
    queryKey: ["symbol-search", type, q],
    queryFn: () => searchSymbols({ type, q }),
    enabled,
    staleTime: 60_000,
  });

  const items = searchQ.data?.items ?? [];

  const highlight = useMemo(() => {
    if (!items.length) return -1;
    if (highlightRaw < 0) return 0;
    return Math.min(highlightRaw, items.length - 1);
  }, [highlightRaw, items.length]);

  const open =
    focused &&
    type === "crypto" &&
    (searchQ.isFetching || items.length > 0 || enabled);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const apply = (symbol?: string) => {
    const s = (symbol ?? q).trim();
    if (!s) return;
    onApply(s);
    setFocused(false);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const helperText = useMemo(() => {
    if (type !== "crypto") return null;
    if (!enabled) return "Type at least 2 characters";
    if (searchQ.isFetching) return "Searching…";
    if (enabled && !items.length) return "No matches";
    return null;
  }, [type, enabled, searchQ.isFetching, items.length]);

  return (
    <div ref={rootRef} className="relative">
      <div className="flex gap-2 items-center">
        <Input
          ref={inputRef}
          className="w-64"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setHighlightRaw(-1);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setFocused(false);
              return;
            }

            if (!open) {
              if (e.key === "Enter") apply();
              return;
            }

            if (e.key === "ArrowDown") {
              e.preventDefault();
              if (!items.length) return;
              setHighlightRaw((h) => (h < 0 ? 0 : (h + 1) % items.length));
              return;
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();
              if (!items.length) return;
              setHighlightRaw((h) => {
                if (h < 0) return items.length - 1;
                return (h - 1 + items.length) % items.length;
              });
              return;
            }

            if (e.key === "Enter") {
              e.preventDefault();
              if (highlight >= 0 && items[highlight])
                apply(items[highlight].symbol);
              else apply();
              return;
            }
          }}
          placeholder={
            type === "crypto" ? "btc / eth / sol" : "aapl.us / tsla.us"
          }
        />

        <Button
          type="button"
          variant="secondary"
          onClick={() => apply()}
          disabled={!q}
        >
          Apply
        </Button>
      </div>

      {open ? (
        <div className="absolute z-20 mt-1 w-64 rounded-xl border bg-white shadow-2xl overflow-hidden">
          {helperText ? (
            <div className="px-3 py-2 text-xs opacity-70">{helperText}</div>
          ) : null}

          {items.length ? (
            <div className="max-h-64 overflow-auto">
              {items.map((it, idx) => {
                const active = idx === highlight;
                return (
                  <button
                    key={it.id ?? it.symbol}
                    type="button"
                    className={[
                      "w-full text-left px-3 py-2 cursor-pointer",
                      active ? "bg-muted" : "hover:bg-muted",
                    ].join(" ")}
                    onMouseEnter={() => setHighlightRaw(idx)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => apply(it.symbol)}
                  >
                    <div className="text-sm">
                      <span className="font-medium">{it.symbol}</span>
                      {it.name ? (
                        <span className="opacity-70"> — {it.name}</span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
