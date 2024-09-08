import { NextResponse } from "next/server";

export default async function authMiddleware(req) {
  const loginUrl = new URL(`/login`, req.url);
  let tokenRefreshed = false; // پرچم برای جلوگیری از تلاش‌های مکرر

  async function sendRequest() {
    // ابتدا توکن‌ها را از کوکی می‌گیریم
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    // اگر accessToken موجود نیست، مستقیماً اقدام به بروزرسانی می‌کنیم
    if (!accessToken && refreshToken) {
      const refreshed = await refreshTokens(req);
      if (refreshed) {
        return sendRequest(); // بعد از بروزرسانی، دوباره درخواست را ارسال می‌کنیم
      } else {
        return NextResponse.redirect(loginUrl); // در صورت عدم موفقیت، کاربر به صفحه ورود هدایت می‌شود
      }
    }

    // درخواست به API با توکن موجود
    const options = {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken};` || "-",
      },
    };

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/user-profile`,
        options
    );

    // اگر دسترسی 401 بود و توکن هنوز بروزرسانی نشده، اقدام به بروزرسانی می‌کنیم
    if (response.status === 401 && refreshToken && !tokenRefreshed) {
      tokenRefreshed = true;
      const refreshed = await refreshTokens(req);
      if (refreshed) {
        return sendRequest(); // درخواست مجدد پس از بروزرسانی
      }
      return NextResponse.redirect(loginUrl); // اگر بروزرسانی ناموفق بود
    }

    // پردازش داده‌ها پس از موفقیت درخواست
    const data = await response.json();
    console.log(data);
    const { user } = data || {};
    return user;
  }

  async function refreshTokens(req) {
    try {
      const refreshToken = req.cookies.get("refreshToken")?.value;
      if (!refreshToken) {
        console.error("رفرش توکن موجود نیست");
        return false;
      }

      const refreshTokenOptions = {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `refreshToken=${refreshToken};` || "-",
        },
      };

      const refreshResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
          refreshTokenOptions
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
