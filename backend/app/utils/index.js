const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
const CreateError = require("http-errors");
const path = require("path");
const fs = require("fs");

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
      }
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
      }
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
              CreateError.Unauthorized("وارد حساب کاربری خود شوید")
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
      }
    );
  });
}

function deleteInvalidPropertyInObject(data = {}, blackListFields = []) {
  let nullishData = ["", " ", "0", 0, null, undefined];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length > 0)
      data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
}

function deleteFileInPublic(fileAddress) {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
}

module.exports = {
  randomNumberGenerator,
  SignAccessToken,
  SignRefreshToken,
  VerifyRefreshToken,
  deleteInvalidPropertyInObject,
  deleteFileInPublic,
};
