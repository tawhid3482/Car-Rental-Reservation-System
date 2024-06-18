// routes.ts

import { Router } from 'express';
import { bookingController } from './booking.controller';

const router = Router();

router.post('/', bookingController.createBookingController);
router.get('/', bookingController.getAllBookings);
// router.get('/:id', bookingController.getSingleBooking);
// router.put('/:id', bookingController.updateSingleBooking);
// router.delete('/:id', bookingController.deleteSingleBooking);

export const BookingRoutes = router;
