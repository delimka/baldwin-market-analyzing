export async function readError(res: Response) {
  const text = await res.text().catch(() => "");
  return `HTTP ${res.status} ${res.statusText}${text ? ` | ${text}` : ""}`;
}
