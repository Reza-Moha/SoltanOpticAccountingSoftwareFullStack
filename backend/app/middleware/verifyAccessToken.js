const CreateError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
const cookieParser = require("cookie-parser");

function VerifyAccessToken(req, res, next) {
  try {
    const accessToken = req.signedCookies["accessToken"];
    if (!accessToken) {
      throw CreateError.Unauthorized("لطفا وارد حساب کاربری خود شوید.");
    }
    const token = cookieParser.signedCookie(
      accessToken,
      process.env.COOKIE_PARSER_SECRET_KEY,
    );
    JWT.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      async (err, payload) => {
        try {
          if (err) throw CreateError.Unauthorized("توکن نامعتبر است");
          const { phoneNumber } = payload || {};
          const user = await UserModel.findOne({
            where: { phoneNumber },
            attributes: { exclude: ["otp", "createdAt", "updatedAt"] },
          });
          if (!user) throw CreateError.Unauthorized("حساب کاربری یافت نشد");
          req.user = user;
          return next();
        } catch (error) {
          next(error);
        }
      },
    );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  VerifyAccessToken,
};
