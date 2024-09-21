require("dotenv").config();
const { Permissions } = require("./app/models/Permissions.model");
const { RolePermissionsModel } = require("./app/models/RolePermissions.model");
const { Roles } = require("./app/models/Roles.model");
const Application = require("./app/server");

Roles.belongsToMany(Permissions, {
  through: RolePermissionsModel,
  foreignKey: "roleId",
  as: "permissions",
});
Permissions.belongsToMany(Roles, {
  through: RolePermissionsModel,
  foreignKey: "permissionId",
  as: "roles",
});

const PORT = process.env.PORT;
new Application(PORT);
