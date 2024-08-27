// routes.ts

import { Router } from "express";
import { BookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validationRequest";
import { validationSchema } from "./booking.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/bookings",
  auth("user"),
  validateRequest(validationSchema.createBookingValidationSchema),
  BookingController.createBookingController
);

router.get(
  "/bookings",
  auth("admin"),
  BookingController.getBookingsByCarAndDateController
);

router.get(
  "/bookings/my-bookings",
  auth("user"),
  BookingController.getBookingsByUserCar
);

router.put(
  "/cars/return",
  auth("admin"),
  validateRequest(validationSchema.returnCarValidationSchema),
  BookingController.returnCarController
);

export const BookingRoutes = router;
