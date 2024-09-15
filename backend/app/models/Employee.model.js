const { DataTypes, Model } = require("@sequelize/core");
const sequelize = require("../config/dbConfig");
const ownerBusinessModel = require("./OwnerBusiness.model");

class EmployeesModel extends Model {}

EmployeesModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationalId: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },

    jobTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    otp: {
      type: DataTypes.JSON,
      defaultValue: {
        code: "",
        expiresIn: new Date().getDate() + 60,
      },
    },
    roles: {
      type: DataTypes.JSON,
      defaultValue: ["Employees"],
    },
  },
  {
    sequelize,
    modelName: "Employees",
    timestamps: true,
  }
);

module.exports = EmployeesModel;
