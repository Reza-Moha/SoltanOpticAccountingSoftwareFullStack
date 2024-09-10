import { NextResponse } from "next/server";
import middlewareAuth from "@/utils/authMiddleware";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/login")) {
    const user = await middlewareAuth(req);
    if (user) {
      const homeUrl = new URL(`/`, req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  if (pathname.startsWith("/admin")) {
    const user = await middlewareAuth(req);
    console.log(user);
    if (!user && user?.role !== process.env.ROLE) {
      const loginUrl = new URL(`/login?redirect=${pathname}`, req.url);
      return NextResponse.redirect(loginUrl);
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
