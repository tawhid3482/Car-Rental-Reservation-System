import express from "express";
import { carController } from "./car.controller";
import auth from "../../middlewares/auth";
import { carValidation } from "./car.validation";
import validateRequest from "../../middlewares/validationRequest";
import { validationSchema } from "../Booking/booking.validation";

const router = express.Router();

router.post(
  "/",
  auth("admin"),
  validateRequest(carValidation.createCarValidationSchema),
  carController.createCarController
);

router.get("/", carController.getAllCars);
router.get("/:id", carController.getSingleCars);

router.put(
  "/:id",
  auth("admin"),
  validateRequest(carValidation.updateCarValidationSchema),
  carController.updateSingleCar
);

// router.put(
//   "/return",
//   auth("admin"),
//   validateRequest(validationSchema.updateBookingValidationSchema),
//   carController.returnTheCar
// );

router.delete("/:id",auth('admin'), carController.deleteSingleCar);

export const CarRoutes = router;
