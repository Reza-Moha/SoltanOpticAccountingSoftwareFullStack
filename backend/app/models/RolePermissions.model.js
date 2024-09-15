const { Model } = require("@sequelize/core");

class RolePermissions extends Model {}

RolePermissions.init(
  {
    roleId: {
      type: Sequelize.UUID, // Adjust the type based on your role ID format
      references: {
        model: "Roles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    permissionId: {
      type: Sequelize.UUID, // Adjust the type based on your permission ID format
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
