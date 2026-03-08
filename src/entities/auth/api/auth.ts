import { fetchJson } from "@/shared/api";
import type { AuthMeResponse, AuthResponse, LoginRequest, RegisterRequest } from "../model/types";

export function login(payload: LoginRequest) {
  return fetchJson<AuthResponse>("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function register(payload: RegisterRequest) {
  return fetchJson<AuthResponse>("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function getCurrentUser() {
  return fetch("/api/auth/me", { cache: "no-store" }).then(async (res) => {
    if (res.status === 401) return { user: null } satisfies AuthMeResponse;
    const text = await res.text();
    const json = text ? (JSON.parse(text) as AuthMeResponse) : { user: null };
    if (!res.ok) {
      throw new Error("Failed to load auth session");
    }
    return json;
  });
}

export function logout() {
  return fetchJson<{ ok: true }>("/api/auth/logout", {
    method: "POST",
  });
}
