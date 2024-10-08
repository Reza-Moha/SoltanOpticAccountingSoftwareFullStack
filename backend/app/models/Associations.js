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

  LensCategory.hasOne(LensModel, { onDelete: "CASCADE" });
  LensModel.belongsTo(LensCategory, { onDelete: "CASCADE" });

  RefractiveIndex.hasOne(LensModel, { onDelete: "CASCADE" });
  LensModel.belongsTo(RefractiveIndex, { onDelete: "CASCADE" });

  LensType.hasOne(LensModel, { onDelete: "CASCADE" });
  LensModel.belongsTo(LensType, { onDelete: "CASCADE" });
};
sequelize.sync({ alter: true });
module.exports = {
  Associations,
};
