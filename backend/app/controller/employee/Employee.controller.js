const { BlackListFields } = require("../../constants");
const { UserModel } = require("../../models/User.model");
const { deleteInvalidPropertyInObject } = require("../../utils");
const {
  createNewEmployeeSchema,
} = require("../../validation/admin/admin.schema");
const Controller = require("../Controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const CreateError = require("http-errors");
class EmployeeController extends Controller {
  async createNewEmployee(req, res, next) {
    try {
      await createNewEmployeeSchema.validateAsync(req.body);
      const {
        fileUploadPath,
        filename,
        phoneNumber,
        fullName,
        gender,
        nationalId,
        jobTitle,
        description,
      } = req.body;
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      deleteInvalidPropertyInObject(req.body, BlackListFields);
      const existingUser = await UserModel.findOne({
        where: {
          [Op.or]: [{ phoneNumber }, { nationalId }],
        },
      });

      if (existingUser)
        throw CreateError.BadRequest("همکاری با این مشخصات قبلا ثبت شده است");

      const createNewEmployee = await UserModel.create({
        profileImage: image,
        phoneNumber,
        fullName,
        gender,
        nationalId,
        jobTitle,
        description,
        role: 11600,
      });
      if (!createNewEmployee)
        throw CreateError.InternalServerError(
          "ایجاد همکار جدید با خطا مواجه شد لطفا دوباره تلاش فرمائید"
        );

      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        message: "همکار جدید با موفقیت ثبت گردید",
        newEmployee: createNewEmployee,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  EmployeeController: new EmployeeController(),
};
