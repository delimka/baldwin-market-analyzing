"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  LANGUAGE_STORAGE_KEY,
  type SupportedLanguage,
} from "./languages";
import { resources } from "./resources";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
  });
}

function detectClientLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (isSupportedLanguage(storedLanguage)) return storedLanguage;

  const browserLanguage = window.navigator.language?.split("-")[0];
  if (isSupportedLanguage(browserLanguage)) return browserLanguage;

  return DEFAULT_LANGUAGE;
}

if (typeof window !== "undefined") {
  const nextLanguage = detectClientLanguage();
  if (i18n.resolvedLanguage !== nextLanguage) {
    void i18n.changeLanguage(nextLanguage);
  }

  i18n.on("languageChanged", (lng) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lng;
    }
  });
}

export { i18n };
