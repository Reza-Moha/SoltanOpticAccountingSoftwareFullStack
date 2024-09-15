const router = require("express").Router();
const {
  PermissionsController,
} = require("../../../controller/admin/RBAC/Perimission.controller");
const {
  RoleController,
} = require("../../../controller/admin/RBAC/Role.controller");
const { stringToArray } = require("../../../middleware/stringToArray");

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

// Role Routes

router.post(
  "/create-new-role",
  stringToArray("permissions"),
  RoleController.createNewRole
);

router.get("/get-all-roles", RoleController.getAllRoles);

module.exports = {
  RBACRoutes: router,
};
