const { StatusCodes: HttpStatus } = require("http-status-codes");
const CreateError = require("http-errors");
const Controller = require("../../Controller");
const {
  createNewRefractiveIndexSchema,
} = require("../../../validation/admin/admin.schema");
const {
  RefractiveIndex,
} = require("../../../models/lens/RefractiveIndex.model");
class LensController extends Controller {
  createNewCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async createNewRefractiveIndex(req, res, next) {
    await createNewRefractiveIndexSchema.validateAsync(req.body);
    const { index, characteristics } = req.body;
    const exsitReflactiveIndex = await RefractiveIndex.findOne({
      where: { index },
    });
    if (exsitReflactiveIndex)
      throw CreateError.BadRequest("ضریب شکست با این مشخصات قبلا ثبت شده است");
    const newIndex = await RefractiveIndex.create({
      index,
      characteristics,
    });
    if (!newIndex)
      throw CreateError.InternalServerError(
        "خطا در ایجاد ضریب شکست لطفا دوباره امتحان کنید"
      );
    return res.status(HttpStatus.CREATED).send({
      statusCode: HttpStatus.CREATED,
      message: "ضریب شکت با موفقیت ذخیره شد",
      newIndex,
    });
    try {
    } catch (error) {
      next(error);
    }
  }

  async getAllRefractiveIndex(req, res, next) {
    try {
      const allRefractiveIndex = await RefractiveIndex.findAll({});
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        allRefractiveIndex,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRefractiveIndexById(req, res, next) {
    try {
      await idSchema.validateAsync(req.params);
      const { id } = req.params;
      if (!id) throw CreateError.BadRequest("شناسه نامعتبر است");
      const refractiveIndex = await RefractiveIndex.findByPk(id);
      if (!refractiveIndex)
        throw CreateError.NotFound("ضریب شکست با این مشخصات وجود ندارد");
      await RefractiveIndex.destroy({ where: { id } });
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: "ضریب شکست با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  LensController: new LensController(),
};
