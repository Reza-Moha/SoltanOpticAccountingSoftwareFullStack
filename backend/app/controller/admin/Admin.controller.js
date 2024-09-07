const Controller = require("../Controller");

class AdminController extends Controller {
  async createNewEmployee(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AdminController: new AdminController(),
};
