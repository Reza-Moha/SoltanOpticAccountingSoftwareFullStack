module.exports = {
  ROLES: Object.freeze({
    USER: process.env.USER_ROLE,
    ADMIN: process.env.ADMIN_ROLE,
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
    TECHNICAL_MANAGER: ["product"],
    ALL: "all",
  }),
  accessTokenCookieOptions: Object.freeze({
    maxAge: 1000 * 60 * 20, // would expire after 20 minutes
    httpOnly: true,
    signed: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV !== "development",
    domain: process.env.DOMAIN,
  }),
  refreshTokenCookieOptions: Object.freeze({
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
    signed: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV !== "development",
    domain: process.env.DOMAIN,
  }),
  BlackListFields: ["otp", "id", "role", "createdAt", "updatedAt", "employee"],
};
