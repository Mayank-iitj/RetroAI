import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedMatchers = [/^\/app/, /^\/api\/companions/, /^\/api\/billing/];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = protectedMatchers.some((regex) => regex.test(pathname));

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = req.cookies.get("authjs.session-token")?.value;
  if (!session) {
    const signInUrl = new URL("/login", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/api/companions/:path*", "/api/billing/:path*"]
};
