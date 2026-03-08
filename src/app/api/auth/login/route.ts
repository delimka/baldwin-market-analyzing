import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { cleanupExpiredSessions, createSession, findUserByEmail, toAuthUser } from "@/features/auth/server/store";
import { verifyPassword } from "@/features/auth/server/password";
import {
  createSessionToken,
  getSessionExpiresAt,
  getSessionMaxAge,
} from "@/features/auth/server/session";
import { SESSION_COOKIE } from "@/features/auth/server/constants";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const body = LoginSchema.parse(raw);

    const user = await findUserByEmail(body.email);
    if (!user || !verifyPassword(body.password, user.passwordHash)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    await cleanupExpiredSessions();

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
