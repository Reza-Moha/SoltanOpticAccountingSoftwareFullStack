const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
const CreateError = require("http-errors");
const { TokenModel } = require("../models/Token.model");
const randomNumberGenerator = () => {
  const number = Math.floor(Math.random() * 100000 + 1);
  if (number.toString().length > 4) {
    return number;
  }
  return randomNumberGenerator();
};

function SignAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findByPk(userId);
    const payload = {
      phoneNumber: user.phoneNumber,
    };
    const options = {
      expiresIn: "1m",
    };
    JWT.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      options,
      (err, token) => {
        if (err) reject(CreateError.InternalServerError("خطای سروری"));
        resolve(token);
      },
    );
  });
}

function SignRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findByPk(userId);
    const payload = {
      phoneNumber: user.phoneNumber,
    };
    const options = {
      expiresIn: "30d",
    };
    JWT.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      options,
      async (err, token) => {
        if (err) reject(CreateError.InternalServerError("خطای سروری"));
        resolve(token);
      },
    );
  });
}

function VerifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (err, payload) => {
        if (err) reject(CreateError.Unauthorized("وارد حساب کاربری خود شوید"));
        const { phoneNumber } = payload || {};
        const user = await UserModel.findOne({
          where: { phoneNumber },
          attributes: { exclude: ["otp", "createdAt", "updatedAt"] },
        });
        const userToken = await TokenModel.findOne({
          where: { userId: user.id },
        });
        if (!user) reject(CreateError.Unauthorized("حساب کاربری یافت نشد"));
        if (!userToken)
          reject(CreateError.Unauthorized("حساب کاربری یافت نشد"));
        if (!userToken.refreshToken)
          reject(
            CreateError.Unauthorized("ورود مجدد به حسابی کاربری انجام نشد"),
          );
        console.log("tokenModelRefresh =====>", userToken);
        console.log("token =====>", token);
        if (token === userToken.refreshToken) return resolve(phoneNumber);
        reject(CreateError.Unauthorized("ورود مجدد به حسابی کاربری انجام نشد"));
      },
    );
  });
}

module.exports = {
  randomNumberGenerator,
  SignAccessToken,
  SignRefreshToken,
  VerifyRefreshToken,
};
