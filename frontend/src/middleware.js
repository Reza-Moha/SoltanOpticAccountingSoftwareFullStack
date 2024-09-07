import { NextResponse } from "next/server";
import AuthMiddleware from "@/utils/authMiddleware";

export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    const user = await AuthMiddleware(req);
    if (user) {
      const homeUrl = new URL(`/`, req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  if (pathname.startsWith("/profile")) {
    const user = await AuthMiddleware(req);

    if (!user) {
      const loginUrl = new URL(`/login?redirect=${pathname}`, req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/signin", "/signup"],
};
