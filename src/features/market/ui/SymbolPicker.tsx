"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import type { MarketType } from "@/entities/market/model/types";
import { cn } from "@/shared/lib/utils";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { searchSymbols } from "@/shared/api/search";

import { Button } from "@/shared/ui/shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/shadcn/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/shadcn/popover";

type Props = {
  type: MarketType;
  value: string;
  onApply: (symbol: string) => void;
};

export function SymbolPicker(props: Props) {
  return <SymbolPickerInner key={`${props.type}:${props.value}`} {...props} />;
}

function SymbolPickerInner({ type, value, onApply }: Props) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(value);

  React.useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const q = useDebounce(draft.trim().toLowerCase(), 250);
  const enabled = type === "crypto" && q.length >= 2;

  const searchQ = useQuery({
    queryKey: ["symbol-search", type, q],
    queryFn: () => searchSymbols({ type, q }),
    enabled,
    staleTime: 60_000,
  });

  const items = searchQ.data?.items ?? [];

  const apply = (symbol?: string) => {
    const s = (symbol ?? draft).trim();
    if (!s) return;
    onApply(s);
    setOpen(false);
  };

  const placeholder =
    type === "crypto" ? "btc / eth / sol" : "aapl.us / tsla.us";

  const helperText = React.useMemo(() => {
    if (type !== "crypto") return null;
    if (q.length < 2) return "Type at least 2 characters";
    if (searchQ.isFetching) return "Searching…";
    if (enabled && !items.length) return "No matches";
    return null;
  }, [type, q.length, enabled, searchQ.isFetching, items.length]);

  const hasExact = !!q && items.some((it) => it.symbol.toLowerCase() === q);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-64 justify-between"
        >
          <span className={cn("truncate", !value && "opacity-70")}>
            {value || placeholder}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-0 bg-white" align="start">
        <Command
          shouldFilter={false}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <CommandInput
            placeholder={placeholder}
            value={draft}
            onValueChange={(v) => setDraft(v)}
            className="h-9"
          />

          <CommandList>
            {helperText ? (
              <div className="px-3 py-2 text-xs opacity-70">{helperText}</div>
            ) : null}

            {!!draft.trim() && (!enabled || !hasExact) ? (
              <CommandGroup>
                <CommandItem
                  value={`__apply__${draft.trim()}`}
                  onSelect={() => apply()}
                >
                  Use &quot;{draft.trim()}&quot;
                </CommandItem>
              </CommandGroup>
            ) : null}

            {items.length ? (
              <CommandGroup>
                {items.map((it) => (
                  <CommandItem
                    key={it.id ?? it.symbol}
                    value={it.symbol}
                    onSelect={(sym) => apply(sym)}
                  >
                    <div className="flex w-full items-center gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="truncate">
                          <span className="font-medium">{it.symbol}</span>
                          {it.name ? (
                            <span className="opacity-70"> — {it.name}</span>
                          ) : null}
                        </div>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto",
                          value?.toLowerCase() === it.symbol.toLowerCase()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>
                {type === "crypto" && enabled ? "No matches" : " "}
              </CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
