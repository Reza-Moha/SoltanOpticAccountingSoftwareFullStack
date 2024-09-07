const { UserController } = require("../../controller/user/UserController");
const router = require("express").Router();

router.get("/user-profile", UserController.userProfile);

module.exports = {
  UserRoutes: router,
};
