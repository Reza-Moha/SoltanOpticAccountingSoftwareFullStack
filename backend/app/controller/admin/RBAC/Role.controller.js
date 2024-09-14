const Controller = require("../../Controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const CreateError = require("http-errors");
const {
  createNewRoleSchema,
} = require("../../../validation/admin/admin.schema");

const { RolesModel } = require("../../../models/Roles.model");
class RoleController extends Controller {
  async createNewRole(req, res, next) {
    try {
      const validation = await createNewRoleSchema.validateAsync(req.body);
      if (validation.error) {
        console.error(validation.error.details);
      } else {
        console.log("Validation successful");
      }
      const { title, permissions, description } = req.body;
      console.log(req.body);

      const exsistRole = await RolesModel.findOne({ where: { title } });
      if (exsistRole)
        throw CreateError.BadRequest("نقش با این مشخصات قبلا ثبت شده است");
      const createRole = await RolesModel.create({
        title,
        description,
        permissionId: permissions,
      });
      if (!createRole)
        throw CreateError.InternalServerError(
          "ایجاد نقش با خطا مواجه شد لطفا دوباره تلاش کنید"
        );
      return res.status(HttpStatus.CREATED).send({
        statusCode: res.statusCode,
        message: "نقش با موفقیت ایجاد شد",
        createdRole: createRole,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  RoleController: new RoleController(),
};
