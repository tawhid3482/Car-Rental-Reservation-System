import express from "express";
import { carController } from "./car.controller";
import validateRequest from "../../middlewares/validationRequest";
import { carValidation } from "./car.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  // auth('admin'),
  validateRequest(carValidation.createCarValidationSchema),
  carController.createCarController
);

router.get("/", carController.getAllCars);
router.get("/:id", carController.getSingleCars);

router.put("/:id", validateRequest(carValidation.carUpdateValidationSchema), carController.updateSingleCar);
router.delete("/:id", carController.deleteSingleCar);

export const CarRoutes = router;
