export default async function authMiddleware(req) {
  const options = {
    method: "GET",
    mode: "cors",
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

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/user-profile`,
      options
    );
    if (response.status === 401 && req.cookies.get("refreshToken")?.value) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
        {
          mode: "cors",
          method: "GET",
          credentials: "include",
          headers: {
            Cookie: `${req.cookies.get("refreshToken")?.name}=${
              req.cookies.get("refreshToken")?.value
            }`,
          },
        }
      );

      const data = await response.json();

      const { user } = data || {};
      return user;
    }
    const data = await response.json();
    const { user } = data || {};
    return user;
  } catch (error) {
    console.log(error);
  }
}
