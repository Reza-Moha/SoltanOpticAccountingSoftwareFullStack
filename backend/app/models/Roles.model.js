const { sequelize } = require("../libs/DBConfig");
const { Model, DataTypes } = require("@sequelize/core");

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
      type: DataTypes.JSON,
      allowNull: false,
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
