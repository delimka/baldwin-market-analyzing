import { createHash, randomBytes } from "crypto";
import { SESSION_TTL_SECONDS } from "./constants";

export function createSessionToken() {
  return randomBytes(32).toString("hex");
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function getSessionExpiresAt() {
  return new Date(Date.now() + SESSION_TTL_SECONDS * 1_000);
}

export function getSessionMaxAge() {
  return SESSION_TTL_SECONDS;
}
