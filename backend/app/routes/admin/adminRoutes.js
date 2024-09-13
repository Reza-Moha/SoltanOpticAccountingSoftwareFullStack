const router = require("express").Router();
const { AdminController } = require("../../controller/admin/Admin.controller");
const { uploadFile } = require("../../utils/multer");
const { RBACRoutes } = require("./RBAC/RBACRoutes");

router.patch(
  "/admin-profile-update",
  uploadFile.single("profileImage"),
  AdminController.updateUserProfile
);
router.use("/RBAC", RBACRoutes);
module.exports = {
  AdminRoutes: router,
};
