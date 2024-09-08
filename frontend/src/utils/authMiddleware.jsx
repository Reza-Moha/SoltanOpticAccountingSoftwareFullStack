import { NextResponse } from "next/server";

export default async function authMiddleware(req) {
  const loginUrl = new URL(`/login`, req.url);

  let attempt = 0;
  const maxAttempts = 1;

  async function sendRequest() {
    const options = {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie:
          `${req.cookies.get("accessToken")?.name}=${
            req.cookies.get("accessToken")?.value
          }; ${req.cookies.get("refreshToken")?.name}=${
            req.cookies.get("refreshToken")?.value
          }` || "-",
      },
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/user-profile`,
      options,
    );

    if (response.status === 401) {
      if (attempt < maxAttempts) {
        attempt += 1;
        const refreshed = await refreshTokens(req);
        if (refreshed) {
          return sendRequest();
        } else {
          return NextResponse.redirect(loginUrl);
        }
      } else {
        return NextResponse.redirect(loginUrl);
      }
    }

    const data = await response.json();
    const { user } = data || {};
    return user;
  }

  async function refreshTokens(req) {
    try {
      const refreshTokenOptions = {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie:
            ` ${req.cookies.get("refreshToken")?.name}=${
              req.cookies.get("refreshToken")?.value
            }` || "-",
        },
      };

      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
        refreshTokenOptions,
      );

      if (refreshResponse.ok) {
        console.log("بروزرسانی توکن موفقیت آمیز بود");
        return true;
      } else {
        console.error("بروزرسانی توکن ناموفق بود");
        return false;
      }
    } catch (error) {
      console.error("بروزرسانی توکن با خطا مواجه شد", error);
      return false;
    }
  }

  return await sendRequest();
}
