const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
const CreateError = require("http-errors");
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
        try {
          if (err)
            return reject(
              CreateError.Unauthorized("وارد حساب کاربری خود شوید"),
            );
          const { phoneNumber } = payload || {};
          const user = await UserModel.findOne({
            where: { phoneNumber },
            attributes: { exclude: ["otp", "createdAt", "updatedAt"] },
          });
          if (!user) {
            return reject(CreateError.Unauthorized("حساب کاربری یافت نشد"));
          }
          return resolve(user.phoneNumber);
        } catch (e) {
          return reject(CreateError.Unauthorized("حساب کاربری یافت نشد"));
        }
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
