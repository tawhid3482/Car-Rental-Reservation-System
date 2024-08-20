// routes.ts

import { Router } from "express";
import { BookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validationRequest";
import { validationSchema } from "./booking.validation";

const router = Router();

router.post(
  "/",
  validateRequest(validationSchema.createBookingValidationSchema),
  BookingController.createBookingController
);

router.get("/", BookingController.getBookingsByCarAndDateController);
// router.get('/:id', bookingController.getSingleBooking);
// router.put('/:id', bookingController.updateSingleBooking);
// router.delete('/:id', bookingController.deleteSingleBooking);

export const BookingRoutes = router;
