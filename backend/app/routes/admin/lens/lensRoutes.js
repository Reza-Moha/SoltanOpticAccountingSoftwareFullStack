const router = require("express").Router();
const {
  LensController,
} = require("../../../controller/admin/lens/Lens.controller");

router.post(
  "/create-refractive-index",
  LensController.createNewRefractiveIndex
);

router.get("/all-refractive-index", LensController.getAllRefractiveIndex);

router.delete(
  "/delete-refractive-index/:id",
  LensController.deleteRefractiveIndexById
);

module.exports = {
  lensRoutes: router,
};
