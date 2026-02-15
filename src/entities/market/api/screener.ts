import { ScreenerRequest, ScreenerResponse } from "@/entities/market";

export async function fetchScreener(
  body: ScreenerRequest
): Promise<ScreenerResponse> {
  const res = await fetch("/api/screener", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok)
    throw new Error(await res.text().catch(() => "Failed to load screener"));
  return res.json();
}

