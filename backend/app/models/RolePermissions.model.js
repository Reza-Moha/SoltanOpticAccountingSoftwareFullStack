const { Model } = require("@sequelize/core");

class RolePermissions extends Model {}

RolePermissions.init(
  {
    roleId: {
      type: Sequelize.UUID,
      references: {
        model: "Roles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    permissionId: {
      type: Sequelize.UUID,
      references: {
        model: "Permissions",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "RolePermission",
    tableName: "RolePermissions",
    timestamps: true,
  }
);
RolePermissions.sync({ alter: true });
