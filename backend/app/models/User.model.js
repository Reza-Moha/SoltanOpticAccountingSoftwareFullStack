const { sequelize } = require("../libs/DBConfig");
const { Model, DataTypes } = require("@sequelize/core");

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    profileImage: {
      type: DataTypes.STRING,
    },
    otp: {
      type: DataTypes.JSON,
      defaultValue: {
        code: 0,
        expiresIn: 0,
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "USER",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  },
);

module.exports = {
  UserModel,
};
