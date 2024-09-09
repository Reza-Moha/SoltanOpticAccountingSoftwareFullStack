export default async function middlewareAuth(req) {
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

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/user-profile`,
      options,
    );
    const data = await response.json();
    const { user } = data || {};
    return user;
  } catch (e) {
    console.log(e);
  }
}
