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
    permissionId: {
      type: DataTypes.JSONB(),
      allowNull: false,
      references: {
        model: PermissionsModel,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "Roles",
    timestamps: true,
  }
);

module.exports = {
  RolesModel,
};
