const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../libs/DBConfig");

class DoctorsModel extends Model {}

DoctorsModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    visitPrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Doctor",
    tableName: "Doctors",
    timestamps: true,
  }
);

module.exports = {
  DoctorsModel,
};
