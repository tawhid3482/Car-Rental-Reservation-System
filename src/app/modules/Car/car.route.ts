import express from "express";
import { carController } from "./car.controller";
import auth from "../../middlewares/auth";
import { carValidation } from "./car.validation";
import validateRequest from "../../middlewares/validationRequest";

const router = express.Router();

router.post(
  "/",
  auth("admin", "super-admin"),
  validateRequest(carValidation.createCarValidationSchema),
  carController.createCarController
);

router.get("/", carController.getAllCars);
router.get("/:id", carController.getSingleCars);

router.put(
  "/return",
  auth("user", "admin", "super-admin"),
  validateRequest(carValidation.returnCarValidationSchema),
  carController.returnCarController
);

router.put(
  "/:id",
  auth("admin", "super-admin"),
  validateRequest(carValidation.updateCarValidationSchema),
  carController.updateSingleCar
);
router.put(
  "/love/:id",
  validateRequest(carValidation.updateCarLoveValidationSchema),
  carController.updateSingleCarLove
);

router.delete(
  "/:id",
  auth("admin", "super-admin"),
  carController.deleteSingleCar
);

export const CarRoutes = router;
