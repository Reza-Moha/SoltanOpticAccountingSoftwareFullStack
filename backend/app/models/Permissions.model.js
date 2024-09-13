const { sequelize } = require("../libs/DBConfig");
const { Model, DataTypes } = require("@sequelize/core");

class PermissionsModel extends Model {}

PermissionsModel.init(
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
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "Permissions",
    timestamps: true,
  }
);

module.exports = {
  PermissionsModel,
};
