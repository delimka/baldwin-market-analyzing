export const SUPPORTED_LANGUAGES = ["en", "ru", "et"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";
export const LANGUAGE_STORAGE_KEY = "baldwin.language";

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: "EN",
  ru: "RU",
  et: "ET",
};

export const ADVICE_LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: "English",
  ru: "Russian",
  et: "Estonian",
};

export function isSupportedLanguage(
  value: string | null | undefined
): value is SupportedLanguage {
  return !!value && SUPPORTED_LANGUAGES.includes(value as SupportedLanguage);
}
