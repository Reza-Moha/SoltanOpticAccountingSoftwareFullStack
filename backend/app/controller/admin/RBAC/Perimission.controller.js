const Controller = require("../../Controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const CreateError = require("http-errors");
const {
  createNewPermissionSchema,
} = require("../../../validation/admin/admin.schema");

const { PermissionsModel } = require("../../../models/Permissions.model");
class PermissionsController extends Controller {
  async createNewPermission(req, res, next) {
    try {
      await createNewPermissionSchema.validateAsync(req.body);
      const { title, description } = req.body;
      const existPermission = await PermissionsModel.findOne({
        where: { title },
      });
      if (existPermission)
        throw CreateError.BadRequest("سطح دسترسی قبلا ایجاد شده است");
      const createPermission = await PermissionsModel.create({
        title,
        description,
      });
      if (!createPermission) {
        throw CreateError.InternalServerError("خطا در ایجاد سطح دسترسی");
      }
      const permissionData = createPermission.get({ plain: true });
      const filteredPermission = {
        id: permissionData.id,
        title: permissionData.title,
      };
      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        message: "سطح دسترسی با موفقیت ایجاد شد",
        permission: filteredPermission,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllPermission(req, res, next) {
    try {
      const allPermission = await PermissionsModel.findAll();
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        allPermission,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  PermissionsController: new PermissionsController(),
};
