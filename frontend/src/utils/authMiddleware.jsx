export default async function middlewareAuth(req) {
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    const options = {
        method: "GET",
        credentials: "include",
        headers: {
            Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}` || "-",
        },
    };

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/user-profile`, options);
        const data = await response.json();


        if (response.ok) {
            const { user } = data || {};
            return user;
        }

        if (response.status === 401 && data?.errors?.statusCode === 401) {
            console.log('Token expired or invalid, refreshing...');


            const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Cookie: `refreshToken=${refreshToken}` || "-",
                },
            });


            if (refreshResponse.ok) {
                console.log('Token refreshed successfully, retrying original request...');


                const newResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/user-profile`, options);
                const newData = await newResponse.json();
                if (newResponse.ok) {
                    const { user } = newData || {};
                    return user;
                }
            } else {
                console.log('Failed to refresh token. Redirect to login.');
            }
        }

        return null;
    } catch (e) {
        console.error("Error in middlewareAuth:", e);
        return null;
    }
}
