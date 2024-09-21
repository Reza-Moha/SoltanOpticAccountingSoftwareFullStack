const { StatusCodes: HttpStatus } = require("http-status-codes");
const Controller = require("../Controller");
const CreateError = require("http-errors");
const {
  createNewDoctorsSchema,
} = require("../../../validation/admin/admin.schema");
class DoctorsController extends Controller {
  async createNewDoctors(req, res, next) {
    try {
      await createNewDoctorsSchema.validateAsync(req.body);
      const { fullName, visitePrice } = req.body;
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  DoctorsController: new DoctorsController(),
};
