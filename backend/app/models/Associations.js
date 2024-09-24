const { sequelize } = require("../libs/DBConfig");
const { Permissions } = require("./Permissions.model");
const { RolePermissionsModel } = require("./RolePermissions.model");
const { Roles } = require("./Roles.model");
const { UserModel } = require("./User.model");

const Associations = () => {
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
  UserModel.hasOne(Roles);
  Roles.belongsTo(UserModel);
  sequelize.sync({ alter: true });
};

module.exports = {
  Associations,
};
