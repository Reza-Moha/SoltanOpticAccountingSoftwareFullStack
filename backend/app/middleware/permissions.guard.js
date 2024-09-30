const CreateError = require("http-errors");
const { Permissions } = require("../models/Permissions.model");
const { Roles } = require("../models/Roles.model");
const { PERMISSIONS } = require("../constants/index");

function checkPermission(requiredPermissions = []) {
  return async function (req, res, next) {
    try {
      const allPermissions = requiredPermissions.flat(2);

      const user = req.user;

      const role = await Roles.findOne({
        where: { title: user.role },
        include: [
          {
            model: Permissions,
            as: "permissions",
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (!role && +user.role !== +PERMISSIONS.ALL) {
        throw CreateError.NotFound("نقش یافت نشد");
      }

      const userPermissions = user?.Role?.permissions.map((item) => item.title);

      if (userPermissions) {
        const hasPermission = allPermissions.every((permission) => {
          userPermissions.includes(permission);
        });
        if (allPermissions.length === 0 || hasPermission) return next();
      }

      if (+user.role === +PERMISSIONS.ALL) return next();

      throw CreateError.Forbidden("شما به این قسمت دسترسی ندارید");
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  checkPermission,
};
