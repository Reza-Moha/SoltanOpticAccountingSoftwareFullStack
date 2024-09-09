module.exports = {
  ROLES: Object.freeze({
    USER: "USER",
    ADMIN: "ADMIN",
    WRITER: "WRITER",
    TEACHER: "TEACHER",
    SUPPLIER: "SUPPLIER",
  }),
  PERMISSIONS: Object.freeze({
    USER: ["profile"],
    ADMIN: ["all"],
    EMPLOYEE: ["all"],
    CONTENT_MANAGER: ["course", "blog", "category", "product"],
    OPTOMETRIST: ["course", "blog"],
    TECKNICAL_MANAGER: ["product"],
    ALL: "all",
  }),
  accessTokenCookieOptions: Object.freeze({
    maxAge: 1000 * 60, // would expire after 20 minutes
    httpOnly: false,
    signed: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
    domain: process.env.DOMAIN,
  }),
  refreshTokenCookieOptions: Object.freeze({
    maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after 1 mount
    httpOnly: false,
    signed: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
    domain: process.env.DOMAIN,
  }),
};
