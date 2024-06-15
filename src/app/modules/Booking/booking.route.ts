// routes.ts

import { Router } from 'express';
import { bookingController } from './booking.controller';

const router = Router();

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.get('/:id', bookingController.getBookingById);
router.delete('/:id', bookingController.deleteBooking);

export const BookingRoutes = router;
