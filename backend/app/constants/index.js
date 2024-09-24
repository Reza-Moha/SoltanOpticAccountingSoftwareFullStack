module.exports = {
  ROLES: Object.freeze({
    USER: process.env.USER_ROLE,
    ADMIN: process.env.ADMIN_ROLE,
    WRITER: "WRITER",
    TEACHER: "TEACHER",
    SUPPLIER: "SUPPLIER",
  }),
  PERMISSIONS: Object.freeze({
    USER: ["Profile"],
    ADMIN: [`${process.env.ADMIN_ROLE}`],
    EMPLOYEE: ["Customers", "Products"],
    OPTOMETRIST: ["Customers"],
    TECHNICAL_MANAGER: ["Product"],
    ALL: `${process.env.ADMIN_ROLE}`,
  }),
  accessTokenCookieOptions: Object.freeze({
    maxAge: 1000 * 60 * 20,
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
