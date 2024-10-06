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

router.post("/create-type", LensController.createNewLensType);

router.get("/all-lens-type", LensController.getAllLensType);

router.delete("/delete-lens-type/:id", LensController.deleteLensTypeById);

module.exports = {
  lensRoutes: router,
};
