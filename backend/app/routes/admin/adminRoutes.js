const { AdminController } = require("../../controller/admin/Admin.controller");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.patch(
  "/admin-profile-update",
  uploadFile.single("profileImage"),
  AdminController.updateUserProfile
);

module.exports = {
  AdminRoutes: router,
};
