const {
  sendOtpSchema,
  checkOtpSchema,
} = require("../../validation/auth/auth.schema");
const {
  randomNumberGenerator,
  SignAccessToken,
  SignRefreshToken,
  VerifyRefreshToken,
} = require("../../utils");
const CreateError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { UserModel } = require("../../models/User.model");
const {
  ROLES,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} = require("../../constants/constants");
const Controller = require("../Controller");

const { TokenModel } = require("../../models/Token.model");
const cookieParser = require("cookie-parser");

class AuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await sendOtpSchema.validateAsync(req.body);
      const { phoneNumber } = req.body;
      const code = randomNumberGenerator();
      const result = await this.saveUser(phoneNumber, code);
      if (!result) throw CreateError.Unauthorized("ورود شما انجام نشد");
      console.log(code);
      return res.status(HttpStatus.OK).send({
        data: {
          statusCode: HttpStatus.OK,
          message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد",
          phoneNumber,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const { phoneNumber, code } = req.body;
      const user = await UserModel.findOne({
        where: { phoneNumber },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: TokenModel,
            attributes: ["accessToken", "refreshToken"],
          },
        ],
      });
      if (!user) throw CreateError.NotFound("کاربر یافت نشد");
      if (user.otp.code != code)
        throw CreateError.Unauthorized("کد ارسال شده صحیح نمیباشد");
      const now = new Date().getTime();
      if (+user.otp.expiresIn < now)
        throw CreateError.Unauthorized("کد شما منقضی شده است");
      const accessToken = await SignAccessToken(user.id);
      const refreshToken = await SignRefreshToken(user.id);
      const existToken = await TokenModel.findOne({
        where: { userId: user.id },
      });
      if (!existToken) {
        const saveTokens = await TokenModel.create({
          userId: user.id,
          accessToken,
          refreshToken,
        });
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
      } else {
        const [updatedRowsCount] = await TokenModel.update(
          { accessToken, refreshToken },
          { where: { userId: user.id } },
        );
        if (updatedRowsCount < 1)
          throw CreateError.InternalServerError(
            "خطای سرور آپدیت ت.کن با خطا مواجه شد",
          );
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
      }

      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          user,
          message: "احراز هویت شما با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async saveUser(phoneNumber, code) {
    const now = new Date().getTime();

    let otp = {
      code,
      expiresIn: now + 60000,
    };
    const user = await this.checkExistUser(phoneNumber);
    if (user) {
      return await this.updateUser(phoneNumber, { otp });
    }

    return await UserModel.create({
      phoneNumber,
      otp,
      role: ROLES.USER,
    });
  }

  async checkExistUser(phoneNumber) {
    return await UserModel.findOne({ where: { phoneNumber } });
  }

  async updateUser(phoneNumber, objectData = {}) {
    try {
      Object.keys(objectData).forEach((key) => {
        if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key])) {
          delete objectData[key];
        }
      });
      const [updatedRowsCount] = await UserModel.update(objectData, {
        where: { phoneNumber },
      });
      return !!updatedRowsCount;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async refreshToken(req, res, next) {
    try {
      const token = req.signedCookies.refreshToken;
      const accessToken = req.signedCookies.accessToken;
      if (!accessToken) {
        if (!token) throw CreateError.Unauthorized("وارد حساب کاربری خود شوید");
        const phoneNumber = await VerifyRefreshToken(token);
        const user = await UserModel.findOne({
          where: { phoneNumber },
          attributes: { exclude: ["otp", "createdAt", "updatedAt"] },
        });

        if (!user) throw CreateError.Unauthorized("کاربر یافت نشد");

        const accessToken = await SignAccessToken(user.id);
        const refreshToken = await SignRefreshToken(user.id);
        const [updatedRowsCount] = await TokenModel.update(
          { accessToken, refreshToken },
          { where: { userId: user.id } },
        );

        if (updatedRowsCount < 1)
          throw CreateError.InternalServerError(
            "خطای سرور: آپدیت توکن با خطا مواجه شد",
          );

        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
        return res.status(HttpStatus.OK).json({
          StatusCode: HttpStatus.OK,
          data: {
            user,
          },
        });
      }
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        message: "احراز هویت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AuthController: new AuthController(),
};
