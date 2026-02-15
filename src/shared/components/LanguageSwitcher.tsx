"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  LANGUAGE_LABELS,
  LANGUAGE_STORAGE_KEY,
  type SupportedLanguage,
} from "@/shared/i18n";

type LanguageOption = {
  code: SupportedLanguage;
  label: string;
};

const defaultLanguages: LanguageOption[] = (Object.keys(
  LANGUAGE_LABELS,
) as SupportedLanguage[]).map((code) => ({
  code,
  label: LANGUAGE_LABELS[code],
}));

type LanguageSwitcherProps = {
  value?: SupportedLanguage;
  onChange?: (value: SupportedLanguage) => void;
  options?: LanguageOption[];
};

export function LanguageSwitcher({
  value,
  onChange,
  options = defaultLanguages,
}: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const selectedCode = useMemo(() => {
    const source = value ?? i18n.resolvedLanguage ?? DEFAULT_LANGUAGE;
    return isSupportedLanguage(source) ? source : DEFAULT_LANGUAGE;
  }, [i18n.resolvedLanguage, value]);

  const current = options.find((language) => language.code === selectedCode) ?? options[0];

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
        className="w-28 border border-border/70 bg-[hsl(var(--background))] p-2 text-[hsl(var(--foreground))] shadow-lg"
      >
        <div className="grid gap-1">
          {options.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => {
                setOpen(false);
                void i18n.changeLanguage(language.code);
                if (typeof window !== "undefined") {
                  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language.code);
                }
                onChange?.(language.code);
              }}
              className={[
                "rounded-md px-2 py-1 text-left text-xs font-medium transition",
                selectedCode === language.code
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
