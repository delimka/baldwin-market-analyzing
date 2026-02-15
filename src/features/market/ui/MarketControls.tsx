"use client";

import { useTranslation } from "react-i18next";
import type { MarketType } from "@/entities/market";
import type { TF } from "@/entities/market";
import type { SupportedLanguage } from "@/shared/i18n";
import { LanguageSwitcher } from "@/shared/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

export function MarketControls(props: {
  type: MarketType;
  timeframe: TF;
  lang: SupportedLanguage;
  onTypeChange: (v: MarketType) => void;
  onTimeframeChange: (v: TF) => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      <Select
        value={props.type}
        onValueChange={(v: string) => props.onTypeChange(v as MarketType)}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder={t("marketControls.type")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="crypto">{t("marketControls.crypto")}</SelectItem>
          <SelectItem value="stock">{t("marketControls.stock")}</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={props.timeframe}
        onValueChange={(v: string) => props.onTimeframeChange(v as TF)}
      >
        <SelectTrigger className="w-28">
          <SelectValue placeholder={t("marketControls.timeframe")} />
        </SelectTrigger>
        <SelectContent className="w-28">
          <SelectItem value="1D">1D</SelectItem>
          <SelectItem value="1H">1H</SelectItem>
        </SelectContent>
      </Select>

      <LanguageSwitcher
        value={props.lang}
      />
    </>
  );
}
