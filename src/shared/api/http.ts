export async function fetchJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);
  const text = await res.text();

  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {}

  if (!res.ok) {
    const msg =
      typeof json === "object" && json !== null && "error" in json
        ? String((json as { error?: unknown }).error ?? "Request failed")
        : text.slice(0, 300) || `Request failed: ${res.status}`;
    throw new Error(msg);
  }

  return json as T;
}
