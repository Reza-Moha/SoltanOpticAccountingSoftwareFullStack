const router = require("express").Router();
const {
  PermissionsController,
} = require("../../../controller/admin/RBAC/Perimission.controller");

router.post(
  "/create-new-permission",
  PermissionsController.createNewPermission
);

module.exports = {
  RBACRoutes: router,
};
