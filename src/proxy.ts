import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/features/auth/server/constants";

export function proxy(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const { pathname } = req.nextUrl;

  if (!token && pathname.startsWith("/market-tracker")) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && pathname === "/login") {
    const trackerUrl = new URL("/market-tracker", req.url);
    return NextResponse.redirect(trackerUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/market-tracker/:path*"],
};
