const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../libs/DBConfig");

class LensCategory extends Model {}

LensCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    lensName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lensImage: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "lens-category",
    timestamps: true,
  }
);

module.exports = { LensCategory };
