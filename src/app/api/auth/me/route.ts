import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findUserBySessionToken, toAuthUser } from "@/features/auth/server/store";
import { SESSION_COOKIE } from "@/features/auth/server/constants";
import { auth } from "@/auth";

export async function GET() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (token) {
    const user = await findUserBySessionToken(token);
    if (user) {
      return NextResponse.json({ user: toAuthUser(user), source: "local" });
    }
  }

  const session = await auth();
  if (session?.user?.email) {
    return NextResponse.json({
      user: {
        id: session.user.email,
        email: session.user.email,
        name: session.user.name ?? undefined,
      },
      source: "google",
    });
  }

  return NextResponse.json({ user: null, source: null }, { status: 401 });
}
