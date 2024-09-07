const { AuthRoutes } = require("./auth/authRoutes");
const { VerifyAccessToken } = require("../middleware/verifyAccessToken");
const { UserRoutes } = require("./user/userRoutes");
const router = require("express").Router();

router.use("/api/auth", AuthRoutes);
router.use("/api/user", VerifyAccessToken, UserRoutes);

module.exports = {
  AllRoutes: router,
};
