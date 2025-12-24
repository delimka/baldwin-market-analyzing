"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import type { Advice } from "@/lib/openai/schemas/adviceSchema";

export function AdviceCard(props: {
  pending: boolean;
  data: Advice | null;
  error?: string | null;
}) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-base">Model signal</CardTitle>
      </CardHeader>

      <CardContent className="text-sm">
        {props.pending ? (
          <div>Thinking...</div>
        ) : props.error ? (
          <div className="text-red-600">{props.error}</div>
        ) : props.data ? (
          <pre className="overflow-auto whitespace-pre-wrap">
            {JSON.stringify(props.data, null, 2)}
          </pre>
        ) : (
          <div className="opacity-70">Use risk management :)</div>
        )}
      </CardContent>
    </Card>
  );
}
