const { StatusCodes: HttpStatus } = require("http-status-codes");
const CreateError = require("http-errors");
const Controller = require("../../Controller");
class LensController extends Controller {
  createNewCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  LensController: new LensController(),
};
