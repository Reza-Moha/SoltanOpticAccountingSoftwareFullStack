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
    TECHNICAL_MANAGER: ["product"],
    ALL: "all",
  }),
  accessTokenCookieOptions: Object.freeze({
    maxAge: 1000 * 60 * 20, // would expire after 20 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true, // Indicates if the cookie should be signed
    sameSite: "Lax",
    secure: process.env.NODE_ENV !== "development",
    domain: process.env.DOMAIN,
  }),
  refreshTokenCookieOptions: Object.freeze({
    maxAge: 1000 * 60 * 60 * 24 * 365, // would expire after 1 year
    httpOnly: true, // The cookie only accessible by the web server
    signed: true, // Indicates if the cookie should be signed
    sameSite: "Lax",
    secure: process.env.NODE_ENV !== "development",
    domain: process.env.DOMAIN,
  }),
  AdminBlackListFields: [
    "otp",
    "id",
    "role",
    "createdAt",
    "updatedAt",
    "employee",
  ],
};
