"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { Button } from "@/shared/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";

type LanguageOption = {
  code: string;
  label: string;
};

const defaultLanguages: LanguageOption[] = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "et", label: "EST" },
];

type LanguageSwitcherProps = {
  value?: string;
  onChange?: (value: string) => void;
  options?: LanguageOption[];
};

export function LanguageSwitcher({
  value,
  onChange,
  options = defaultLanguages,
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(options[0]);

  useEffect(() => {
    if (!value) return;
    const match = options.find((language) => language.code === value);
    if (match) setCurrent(match);
  }, [options, value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 rounded-full border border-border/60 bg-card/80 px-3 text-sm shadow-sm backdrop-blur hover:bg-card"
        >
          <Globe className="size-4" />
          <span>{current.label}</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-28 border border-border/70 bg-card p-2 text-[hsl(var(--foreground))] shadow-lg bg-[hsl(var(--background))]"
      >
        <div className="grid gap-1">
          {options.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => {
                setCurrent(language);
                setOpen(false);
                onChange?.(language.code);
              }}
              className={[
                "rounded-md px-2 py-1 text-left text-xs font-medium transition",
                current.code === language.code
                  ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
                  : "hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]",
              ].join(" ")}
            >
              {language.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
