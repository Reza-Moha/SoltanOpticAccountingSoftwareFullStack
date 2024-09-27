const { DataTypes } = require("sequelize");
const { sequelize } = require("../../libs/DBConfig");

const typeOfLensModel = sequelize.define(
  "typeOfLens",
  {
    typeOfLensId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    typeName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  typeOfLensModel,
};
