const router = require("express").Router();
const {
  LensController,
} = require("../../../controller/admin/lens/Lens.controller");

router.post(
  "/create-refractive-index",
  LensController.createNewRefractiveIndex
);

router.get("/all-refractive-index", LensController.getAllRefractiveIndex);

module.exports = {
  lensRoutes: router,
};
