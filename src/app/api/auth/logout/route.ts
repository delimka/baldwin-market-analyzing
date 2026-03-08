import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSessionByToken } from "@/features/auth/server/store";
import { SESSION_COOKIE } from "@/features/auth/server/constants";

export async function POST() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (token) {
    await deleteSessionByToken(token);
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
