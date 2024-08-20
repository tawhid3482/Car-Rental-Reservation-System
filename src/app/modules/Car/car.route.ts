import express from "express";
import { carController } from "./car.controller";
import auth from "../../middlewares/auth";
import { carValidation } from "./car.validation";
import validateRequest from "../../middlewares/validationRequest";

const router = express.Router();

router.post(
  "/",
  validateRequest(carValidation.createCarValidationSchema),
  carController.createCarController
);

router.get("/", carController.getAllCars);
router.get("/:id", carController.getSingleCars);

router.put(
  "/:id",
  // auth("admin"),
  validateRequest(carValidation.updateCarValidationSchema),
  carController.updateSingleCar
);
router.delete("/:id",  carController.deleteSingleCar);

export const CarRoutes = router;
