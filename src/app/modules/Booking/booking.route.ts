// routes.ts

import { Router } from 'express';
import { BookingController } from './booking.controller';

const router = Router();

router.post('/', BookingController.createBookingController);
router.get('/', BookingController.getAllBookingsController);
// router.get('/:id', bookingController.getSingleBooking);
// router.put('/:id', bookingController.updateSingleBooking);
// router.delete('/:id', bookingController.deleteSingleBooking);

export const BookingRoutes = router;
