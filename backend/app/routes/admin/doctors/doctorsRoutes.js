const router = require("express").Router();
const {
  DoctorsController,
} = require("../../../controller/admin/doctors/Doctors.controller");

router.post("/create-new", DoctorsController.createNewDoctors);

router.get("/get-all-doctors", DoctorsController.getAllDoctors);

router.get("/get-byId/:id", DoctorsController.getDoctorById);

router.delete("/delete/:id", DoctorsController.deleteDoctorById);

router.patch("/update/:id", DoctorsController.updateDctors);

module.exports = {
  doctorsRoutes: router,
};
