const Controller = require("../../Controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const CreateError = require("http-errors");
const {
  createNewRoleSchema,
} = require("../../../validation/admin/admin.schema");

const { RolesModel } = require("../../../models/Roles.model");
const { PermissionsModel } = require("../../../models/Permissions.model");
class RoleController extends Controller {
  async createNewRole(req, res, next) {
    try {
      await createNewRoleSchema.validateAsync(req.body);

      const { title, permissions, description } = req.body;
      console.log(req.body);

      const exsistRole = await RolesModel.findOne({ where: { title } });
      if (exsistRole)
        throw CreateError.BadRequest("نقش با این مشخصات قبلا ثبت شده است");
      const createRole = await RolesModel.create({
        title,
        description,
        permissionsId: permissions,
      });
      if (!createRole)
        throw CreateError.InternalServerError(
          "ایجاد نقش با خطا مواجه شد لطفا دوباره تلاش کنید"
        );
      if (permissions && permissions.length > 0) {
        await createRole.setPermissions(permissions);
      }
      return res.status(HttpStatus.CREATED).send({
        statusCode: res.statusCode,
        message: "نقش با موفقیت ایجاد شد",
        createdRole: createRole,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllRoles(req, res, next) {
    try {
      const allRoles = await RolesModel.findAll({});
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        allRoles,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  RoleController: new RoleController(),
};
