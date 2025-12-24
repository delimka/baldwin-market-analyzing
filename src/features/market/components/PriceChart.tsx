"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type PriceChartProps = {
  data: { t: number; close: number }[];
};

export const PriceChart = ({ data }: PriceChartProps) => {
  const chartData = data.map((d) => ({
    t: d.t,
    close: d.close,
    date: new Date(d.t).toLocaleString(),
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="date" hide />
          <YAxis domain={["auto", "auto"]} width={60} />
          <Tooltip />
          <Line type="monotone" dataKey="close" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
