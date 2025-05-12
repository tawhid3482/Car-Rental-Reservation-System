// routes.ts

import { Router } from "express";
import { BookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validationRequest";
import { validationSchema } from "./booking.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/",
  auth("user", "admin", "super-admin"),
  validateRequest(validationSchema.createBookingValidationSchema),
  BookingController.createBookingController
);
router.get(
  "/",
  // auth("admin"),
  BookingController.getBookingsByCarAndDateController
);
router.get("/", auth("admin"), BookingController.getAllBookings);

router.get(
  "/my-bookings",
  auth("user"),
  BookingController.getBookingsByUserCar
);

router.get("/my-bookings/:email",auth("user", "admin", "super-admin"), BookingController.getBookingsUser);
router.get(
  "/my-bookings/id/:id",
  auth("user", "admin", "super-admin"),
  BookingController.getBookingsById
);

export const BookingRoutes = router;
