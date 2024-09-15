const { sequelize } = require("../libs/DBConfig");
const { Model, DataTypes } = require("@sequelize/core");
const { PermissionsModel } = require("./Permissions.model");

class RolesModel extends Model {}

RolesModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissionsId: {
      type: DataTypes.JSON(DataTypes.UUID),
      allowNull: false,
      references: {
        model: PermissionsModel,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "Roles",
    timestamps: true,
  }
);
// RolesModel.hasMany(PermissionsModel, { foreignKey: "permissionsId" });
// PermissionsModel.belongsTo(RolesModel, { foreignKey: "permissionsId" });

module.exports = {
  RolesModel,
};
