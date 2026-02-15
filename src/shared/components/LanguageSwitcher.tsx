"use client";

import { useMemo } from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui";
import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  LANGUAGE_STORAGE_KEY,
  type SupportedLanguage,
} from "@/shared/i18n";

type LanguageOption = {
  code: SupportedLanguage;
  label: string;
  title: string;
};

const defaultLanguages: LanguageOption[] = [
  { code: "en", label: "EN", title: "English" },
  { code: "ru", label: "RU", title: "Русский" },
  { code: "et", label: "ET", title: "Eesti" },
];

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

  const selectedCode = useMemo(() => {
    const source = value ?? i18n.resolvedLanguage ?? DEFAULT_LANGUAGE;
    return isSupportedLanguage(source) ? source : DEFAULT_LANGUAGE;
  }, [i18n.resolvedLanguage, value]);

  const selectedOption =
    options.find((language) => language.code === selectedCode) ?? options[0];

  const handleSelect = (nextLanguage: string) => {
    if (!isSupportedLanguage(nextLanguage)) return;
    void i18n.changeLanguage(nextLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    }
    onChange?.(nextLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 rounded-full border border-border/60 bg-primary px-3 text-sm shadow-sm backdrop-blur hover:bg-card"
        >
          <Languages className="size-4" />
          <span>{selectedOption.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedCode}
          onValueChange={handleSelect}
        >
          {options.map((language) => (
            <DropdownMenuRadioItem
              className="cursor-pointer"
              key={language.code}
              value={language.code}
            >
              {language.title}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
