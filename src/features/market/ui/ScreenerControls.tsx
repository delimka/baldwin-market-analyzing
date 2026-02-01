"use client";

import { Button } from "@/shared/ui/shadcn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/shadcn/select";
import type {
  ScreenerRequest,
  ScreenerTop,
  ScreenerTimeframe,
} from "@/entities/market/model/types";

export function ScreenerControls(props: {
  value: Pick<ScreenerRequest, "top" | "timeframe" | "withNews">;
  onChange: (
    next: Pick<ScreenerRequest, "top" | "timeframe" | "withNews">
  ) => void;
}) {
  const { value, onChange } = props;

  const setTop = (top: ScreenerTop) => onChange({ ...value, top });
  const setTimeframe = (timeframe: ScreenerTimeframe) =>
    onChange({ ...value, timeframe });
  const toggleNews = () => onChange({ ...value, withNews: !value.withNews });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2">
        <Button
          variant={value.top === 5 ? "default" : "outline"}
          onClick={() => setTop(5)}
        >
          Top 5
        </Button>
        <Button
          variant={value.top === 10 ? "default" : "outline"}
          onClick={() => setTop(10)}
        >
          Top 10
        </Button>
        <Button
          variant={value.top === 30 ? "default" : "outline"}
          onClick={() => setTop(30)}
        >
          Top 30
        </Button>
      </div>

      <div className="w-35">
        <Select
          value={value.timeframe}
          onValueChange={(v) => setTimeframe(v as ScreenerTimeframe)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1H">1H</SelectItem>
            <SelectItem value="1D">1D</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant={value.withNews ? "default" : "outline"}
        onClick={toggleNews}
      >
        News: {value.withNews ? "ON" : "OFF"}
      </Button>
    </div>
  );
}
