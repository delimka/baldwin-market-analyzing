import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { createSession, createUser, findUserByEmail, toAuthUser } from "@/features/auth/server/store";
import { hashPassword } from "@/features/auth/server/password";
import {
  createSessionToken,
  getSessionExpiresAt,
  getSessionMaxAge,
} from "@/features/auth/server/session";
import { SESSION_COOKIE } from "@/features/auth/server/constants";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().trim().min(2).max(60).optional(),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const body = RegisterSchema.parse(raw);

    const existing = await findUserByEmail(body.email);
    if (existing) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

    const user = await createUser({
      email: body.email,
      name: body.name,
      passwordHash: hashPassword(body.password),
    });

    const token = createSessionToken();
    await createSession({
      userId: user.id,
      token,
      expiresAt: getSessionExpiresAt(),
    });

    const res = NextResponse.json({ user: toAuthUser(user) });
    res.cookies.set({
      name: SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: getSessionMaxAge(),
    });
    return res;
  } catch (e: unknown) {
    if (e instanceof ZodError) {
      return NextResponse.json({ error: "Invalid request body", details: e.issues }, { status: 400 });
    }
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
