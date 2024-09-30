const { sequelize } = require("../libs/DBConfig");
const LensModel = require("./lens/Lens.model");
const { LensCategory } = require("./lens/LensCategory.model");
const { RefractiveIndex } = require("./lens/RefractiveIndex.model");
const { typeOfLensModel } = require("./lens/TypeOfLens.model");
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
  LensCategory.hasMany(LensModel);
  LensModel.belongsTo(LensCategory);
  LensCategory.hasOne(typeOfLensModel);
  LensModel.hasOne(typeOfLensModel);
  typeOfLensModel.belongsTo(LensModel);
  RefractiveIndex.hasMany(LensModel);
  LensModel.belongsTo(RefractiveIndex);
};
sequelize.sync({ alter: true });
module.exports = {
  Associations,
};
