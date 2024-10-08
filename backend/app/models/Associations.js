const { sequelize } = require("../libs/DBConfig");
const LensModel = require("./lens/Lens.model");
const { LensCategory } = require("./lens/LensCategory.model");
const { LensType } = require("./lens/LensType.model");
const { RefractiveIndex } = require("./lens/RefractiveIndex.model");
const { Permissions } = require("./Permissions.model");
const { RolePermissionsModel } = require("./RolePermissions.model");
const { Roles } = require("./Roles.model");
const { UserModel } = require("./User.model");

const Associations = () => {
  // roles & permissions
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
  Roles.belongsTo(UserModel);

  // user
  UserModel.hasOne(Roles);

  // lens

  LensCategory.hasOne(LensModel);
  LensModel.belongsTo(LensCategory);

  RefractiveIndex.hasOne(LensModel);
  LensModel.belongsTo(RefractiveIndex);

  LensType.hasOne(LensModel);
  LensModel.belongsTo(LensType);
};
sequelize.sync({ alter: true });
module.exports = {
  Associations,
};
