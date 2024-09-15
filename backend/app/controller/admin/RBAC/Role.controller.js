const Controller = require("../../Controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const CreateError = require("http-errors");
const {
  createNewRoleSchema,
  idSchema,
} = require("../../../validation/admin/admin.schema");

const { RolesModel } = require("../../../models/Roles.model");
const { PermissionsModel } = require("../../../models/Permissions.model");
const { deleteInvalidPropertyInObject } = require("../../../utils");
class RoleController extends Controller {
  async createNewRole(req, res, next) {
    try {
      await createNewRoleSchema.validateAsync(req.body);
      const { title, permissions, description } = req.body;
      console.log(req.body);
      RolesModel.sync({ alter: true });
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
      const allRoles = await RolesModel.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      const rolesWithPermissions = await Promise.all(
        allRoles.map(async (role) => {
          const permissions = await PermissionsModel.findAll({
            where: {
              id: role.permissionsId,
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
          });

          return {
            ...role.toJSON(),
            permissions,
          };
        })
      );

      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        allRoles: rolesWithPermissions,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRoleById(req, res, next) {
    try {
      await idSchema.validateAsync(req.params);
      const { id } = req.params;
      if (!id) throw CreateError.BadRequest("شناسه نامعتبر است");
      const Role = await RolesModel.findByPk(id);
      if (!Role) throw CreateError.NotFound("نقش با این مشخصات وجود ندارد");
      await RolesModel.destroy({ where: { id } });
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: "نقش با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRole(req, res, next) {
    try {
      await idSchema.validateAsync(req.params);
      const { id } = req.params;
      const existRole = await RolesModel.findByPk(id);
      if (!existRole) throw CreateError.NotFound("نقشی با این مشخصات پیدا نشد");
      await createNewRoleSchema.validateAsync(req.body);
      const data = JSON.parse(JSON.stringify(req.body));
      deleteInvalidPropertyInObject(data, []);
      const [updatedRowsCount] = await RolesModel.update(
        {
          title: data.title,
          description: data.description,
          permissionsId: data.permissions,
        },
        {
          where: { id },
          returning: true,
        }
      );

      if (updatedRowsCount === 0)
        throw CreateError.InternalServerError(" عملیات ویرایش انجام نشد");
      const updatedRole = await RolesModel.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      const permissions = await PermissionsModel.findAll({
        where: {
          id: updatedRole.permissionsId,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: "نقش مورد نظر با موفقیت ویرایش گردید",
        updatedRole: {
          ...updatedRole.toJSON(),
          permissions,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  RoleController: new RoleController(),
};
