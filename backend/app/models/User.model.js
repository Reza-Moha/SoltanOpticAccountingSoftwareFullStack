const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../libs/DBConfig");
const { RolePermissionsModel } = require("./RolePermissions.model");
class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
    },
    gender: {
      type: DataTypes.STRING(5),
    },
    nationalId: {
      type: DataTypes.STRING(10),
    },
    jobTitle: {
      type: DataTypes.STRING(20),
    },
    fullName: {
      type: DataTypes.STRING(30),
    },
    phoneNumber: {
      type: DataTypes.STRING(11),
    },
    description: {
      type: DataTypes.STRING(100),
    },
    profileImage: {
      type: DataTypes.STRING(100),
    },
    otp: {
      type: DataTypes.JSONB,
      defaultValue: {
        code: 0,
        expiresIn: 0,
      },
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 11600,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);

module.exports = {
  UserModel,
};
