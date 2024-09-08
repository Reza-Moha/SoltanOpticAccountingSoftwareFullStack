import { NextResponse } from "next/server";
import authMiddleware from "@/utils/authMiddleware";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/login")) {
    const user = await authMiddleware(req);
    if (user.role) {
      const homeUrl = new URL(`/`, req.url);
      return NextResponse.redirect(homeUrl);
    }
  }
  if (pathname.startsWith("/admin")) {
    const user = await authMiddleware(req);
    if (!user || !user.role || user.role !== process.env.ADMINROLE) {
      const loginUrl = new URL(`login`, req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
