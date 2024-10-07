const { StatusCodes: HttpStatus } = require("http-status-codes");
const CreateError = require("http-errors");
const Controller = require("../../Controller");
const {
  createNewRefractiveIndexSchema,
  idSchema,
  createNewLensTypeSchema,
  createNewLensCategorySchema,
  createNewLensSchema,
} = require("../../../validation/admin/admin.schema");
const {
  RefractiveIndex,
} = require("../../../models/lens/RefractiveIndex.model");
const { LensType } = require("../../../models/lens/LensType.model");
const path = require("path");
const { LensCategory } = require("../../../models/lens/LensCategory.model");
const LensModel = require("../../../models/lens/Lens.model");
const { deleteFileInPublic } = require("../../../utils");
class LensController extends Controller {
  async createNewLens(req, res, next) {
    try {
      console.log(req.body);
      const {
        lensName,
        description,
        lensCategoryId,
        RefractiveIndexId,
        LensTypeId,
        fileUploadPath,
        filename,
      } = await createNewLensSchema.validateAsync(req.body);
      const lensImage = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const exsistLens = await LensModel.findOne({
        where: {
          lensName,
          lensCategoryId,
        },
      });
      if (exsistLens)
        throw CreateError.BadRequest("عدسی با این مشخصات قبلا ثبت شده است");
      const createdNewLens = await LensModel.create({
        lensImage,
        lensName,
        description,
        lensCategoryId,
        RefractiveIndexId,
        LensTypeId,
      });
      if (!createdNewLens)
        throw CreateError.InternalServerError(
          "در ایجاد عدسی جدید با خطا روبرو شد لظفا دوباره امتحان کنید"
        );
      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        message: "عدسی با موفقیت به انبار اضافه شد",
        createdNewLens,
      });
    } catch (error) {
      const { fileUploadPath, filename } = req.body;
      console.log(fileUploadPath, filename);
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      deleteFileInPublic(image);
      next(error);
    }
  }

  async createNewRefractiveIndex(req, res, next) {
    try {
      await createNewRefractiveIndexSchema.validateAsync(req.body);
      const { index, characteristics } = req.body;
      const exsitReflactiveIndex = await RefractiveIndex.findOne({
        where: { index },
      });
      if (exsitReflactiveIndex)
        throw CreateError.BadRequest(
          "ضریب شکست با این مشخصات قبلا ثبت شده است"
        );
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

  async createNewLensType(req, res, next) {
    try {
      const { title, description } =
        await createNewLensTypeSchema.validateAsync(req.body);

      const exsitLensType = await LensType.findOne({
        where: { title },
      });
      if (exsitLensType)
        throw CreateError.BadRequest("نوع عدسی با این مشخصات قبلا ثبت شده است");
      const newLensType = await LensType.create({
        title,
        description,
      });
      if (!newLensType)
        throw CreateError.InternalServerError(
          "خطا در ایجاد نوع عدسی لطفا دوباره امتحان کنید"
        );
      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        message: "نوع عدسی با موفقیت ذخیره شد",
        newLensType,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllLensType(req, res, next) {
    try {
      const allLensType = await LensType.findAll({});
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        allLensType,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteLensTypeById(req, res, next) {
    try {
      await idSchema.validateAsync(req.params);
      const { id } = req.params;
      if (!id) throw CreateError.BadRequest("شناسه نامعتبر است");
      const result = await LensType.findByPk(id);
      if (!result)
        throw CreateError.NotFound("نوع عدسی با این مشخصات وجود ندارد");
      await result.destroy({ where: { id } });
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: "ضریب شکست با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async createNewLensCategory(req, res, next) {
    try {
      const { lensName, fileUploadPath, filename } =
        await createNewLensCategorySchema.validateAsync(req.body);
      const lensImage = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const exsitLensCategoty = await LensCategory.findOne({
        where: { lensName },
      });
      if (exsitLensCategoty)
        throw CreateError.BadRequest(
          "دسته بندی با این مشخصات قبلا ثبت شده است"
        );
      const newLensCategory = await LensCategory.create({
        lensName,
        lensImage,
      });
      if (!newLensCategory)
        throw CreateError.InternalServerError(
          "خطا در ایجاد دسته بندی لطفا دوباره امتحان کنید"
        );
      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        message: "دسته بندی با موفقیت ذخیره شد",
        newLensCategory,
      });
    } catch (error) {
      const { fileUploadPath, filename } = req.body;
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      deleteFileInPublic(image);
      next(error);
    }
  }

  async deleteLensCategoryById(req, res, next) {
    try {
      await idSchema.validateAsync(req.params);
      const { id } = req.params;
      if (!id) throw CreateError.BadRequest("شناسه نامعتبر است");
      const result = await LensCategory.findByPk(id);
      if (!result)
        throw CreateError.NotFound("دسته بندی عدسی با این مشخصات وجود ندارد");
      await result.destroy({ where: { id } });
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: "دسته بندی با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllLensCategories(req, res, next) {
    try {
      const allLensCategories = await LensCategory.findAll({});
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        allLensCategories,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  LensController: new LensController(),
};
