const { DataTypes } = require("sequelize");
const { sequelize } = require("../../libs/DBConfig");
const LensGroup = sequelize.define(
  "LensGroup",
  {
    group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    tableName: "lens-group",
  }
);

module.exports = { LensGroup };
