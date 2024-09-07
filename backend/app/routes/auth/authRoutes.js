const { AuthController } = require("../../controller/auth/AuthController");
const router = require("express").Router();

router.post("/get-otp", AuthController.getOtp);

router.post("/check-otp", AuthController.checkOtp);

router.get("/refresh-token", AuthController.refreshToken);

module.exports = {
  AuthRoutes: router,
};
