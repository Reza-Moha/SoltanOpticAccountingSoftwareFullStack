const { DataTypes } = require("@sequelize/core");
const sequelize = require("../config/databaseConfig");
const { LensGroupModel } = require("./LensGroup.model");
const { LensCategory } = require("./LensCategory.model");

const LensModel = sequelize.define(
  "Lens",
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
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: LensCategory,
        key: "id",
      },
      allowNull: false,
    },
    lensGroupId: {
      type: DataTypes.UUID,
      references: {
        model: LensGroupModel,
        key: "id",
      },
      allowNull: false,
    },
    refractiveIndex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeOfLens: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lensImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "lenses",
    timestamps: false,
  }
);

// LensModel.belongsTo(ParentLensModel, {
//   foreignKey: "parentId",
// });

// ParentLensModel.hasMany(LensModel, {
//   foreignKey: "parentId",
// });

// LensModel.belongsTo(LensGroupModel, {
//   foreignKey: "lensGroupId",
// });

// LensGroupModel.hasMany(LensModel, {
//   foreignKey: "lensGroupId",
// });

module.exports = LensModel;
