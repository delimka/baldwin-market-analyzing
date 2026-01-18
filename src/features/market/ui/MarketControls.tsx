"use client";

import type { MarketType } from "@/entities/market/model/types";
import type { TF } from "@/shared/api/market";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/shadcn/select";

export function MarketControls(props: {
  type: MarketType;
  timeframe: TF;
  lang: string;
  onTypeChange: (v: MarketType) => void;
  onTimeframeChange: (v: TF) => void;
  onLangChange?: (v: string) => void;
}) {
  return (
    <>
      <Select
        value={props.type}
        onValueChange={(v: string) => props.onTypeChange(v as MarketType)}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="type" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="crypto">Crypto</SelectItem>
          <SelectItem value="stock">Stock</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={props.timeframe}
        onValueChange={(v: string) => props.onTimeframeChange(v as TF)}
      >
        <SelectTrigger className="w-28">
          <SelectValue placeholder="TF" />
        </SelectTrigger>
        <SelectContent className="bg-white w-28">
          <SelectItem value="1D">1D</SelectItem>
          <SelectItem value="1H">1H</SelectItem>
        </SelectContent>
      </Select>

      <Select value={props.lang} onValueChange={props.onLangChange}>
        <SelectTrigger className="w-28">
          <SelectValue placeholder="lang" />
        </SelectTrigger>
        <SelectContent className="bg-white w-28">
          <SelectItem value="rus">RUS</SelectItem>
          <SelectItem value="eng">ENG</SelectItem>
          <SelectItem value="fin">FIN</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
