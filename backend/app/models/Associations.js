const { sequelize } = require("../libs/DBConfig");
const LensModel = require("./lens/Lens.model");
const { LensCategory } = require("./lens/LensCategory.model");
const { typeOfLensModel } = require("./lens/TypeOfLens.model");
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
  LensCategory.hasMany(LensModel);
  LensModel.belongsTo(LensCategory);
  LensCategory.hasOne(typeOfLensModel);
  LensModel.hasOne(typeOfLensModel);
  typeOfLensModel.belongsTo(LensModel);
};

module.exports = {
  Associations,
};
