const { AdminBlackListFields } = require("../../constants");
const { UserModel } = require("../../models/User.model");
const {
  deleteInvalidPropertyInObject,
  deleteFileInPublic,
} = require("../../utils");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const {
  updateAdminProfileSchema,
} = require("../../validation/admin/admin.schema");
const Controller = require("../Controller");
const path = require("path");

class AdminController extends Controller {
  async createNewEmployee(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async updateUserProfile(req, res, next) {
    try {
      await updateAdminProfileSchema.validateAsync(req.body);

      const { fileUploadPath, filename, phoneNumber, fullName } = req.body;
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");

      deleteInvalidPropertyInObject(req.body, AdminBlackListFields);
      const id = req.user.id;

      const [updatedRowsCount, updatedUsers] = await UserModel.update(
        { fullName, phoneNumber, profileImage: image },
        {
          where: { id },
          returning: true,
        }
      );
      if (updatedRowsCount === 0) {
        return res.status(HttpStatus.NOT_FOUND).send({
          statusCode: HttpStatus.NOT_FOUND,
          message: "کاربر پیدا نشد",
        });
      }

      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: "پروفایل با موفقیت به‌روزرسانی شد",
        user: updatedUsers[0],
      });
    } catch (error) {
      const { fileUploadPath, filename } = req.body;
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      deleteFileInPublic(image);
      next(error);
    }
  }
}

module.exports = {
  AdminController: new AdminController(),
};
