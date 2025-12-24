"use client";

import type { MarketType } from "@/entities/market/types";
import type { TF } from "@/shared/api/market";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export function MarketControls(props: {
  type: MarketType;
  timeframe: TF;
  onTypeChange: (v: MarketType) => void;
  onTimeframeChange: (v: TF) => void;
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
        <SelectContent>
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
        <SelectContent>
          <SelectItem value="1D">1D</SelectItem>
          <SelectItem value="1H">1H</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
