const { sequelize } = require("../libs/DBConfig");
const { Model, DataTypes } = require("@sequelize/core");
const { UserModel } = require("./User.model");

class TokenModel extends Model {}

TokenModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Token",
    tableName: "Tokens",
    timestamps: true,
  },
);

module.exports = {
  TokenModel,
};
