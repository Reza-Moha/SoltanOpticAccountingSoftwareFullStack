module.exports = {
  MongoIDPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
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
    SUPERADMIN: ["all"],
    CONTENT_MANAGER: ["course", "blog", "category", "product"],
    TEACHER: ["course", "blog"],
    SUPPLIER: ["product"],
    ALL: "all",
  }),
  accessTokenCookieOptions: Object.freeze({
    maxAge: 1000 * 60, // would expire after 20 minutes
    httpOnly: true,
    signed: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
    domain: process.env.DOMAIN,
  }),
  refreshTokenCookieOptions: Object.freeze({
    maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after 1 mount
    httpOnly: true,
    signed: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
    domain: process.env.DOMAIN,
  }),
};
