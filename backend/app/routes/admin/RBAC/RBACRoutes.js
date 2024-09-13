const router = require("express").Router();
const {
  PermissionsController,
} = require("../../../controller/admin/RBAC/Perimission.controller");

router.post(
  "/create-new-permission",
  PermissionsController.createNewPermission
);
router.get("/get-all-permission", PermissionsController.getAllPermission);

router.delete(
  "/delete-permission/:id",
  PermissionsController.deletePermissionById
);

router.patch("/update-permission/:id", PermissionsController.updatePermission);

module.exports = {
  RBACRoutes: router,
};
