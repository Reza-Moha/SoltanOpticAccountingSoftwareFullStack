const CreateError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
const { TokenModel } = require("../models/Token.model");
const cookieParser = require("cookie-parser");

function VerifyAccessToken(req, res, next) {
  try {
    const result = req.signedCookies.accessToken;
    // const token = cookieParser.signedCookie(
    //   result,
    //   process.env.COOKIES_SECRET_KEY,
    // );
    JWT.verify(
      result,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      async (err, payload) => {
        try {
          console.log(err);
          if (err) throw CreateError.Unauthorized("وارد حساب کاربری خود شوید");
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
