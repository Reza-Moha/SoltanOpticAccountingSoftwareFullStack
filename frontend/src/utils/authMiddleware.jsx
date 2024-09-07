export default async function AuthMiddleware(req) {
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

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/user-profile`,
    options,
  )
    .then((res) => res.json())
    .then((res) => res.data);
  console.log("AuthMiddleware", data);
  const { user } = data || {};
  console.log(data);
  return user;
}
