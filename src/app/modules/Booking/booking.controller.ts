import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import { Types } from 'mongoose';
import { createBookingValidationSchema } from './booking.validation';
import { BookingServices } from './booking.service';

// Create a new booking
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the request body
    const validationResults = createBookingValidationSchema.safeParse(req);
    if (!validationResults.success) {
      return res.status(httpStatus.BAD_REQUEST).json({ errors: validationResults.error.errors });
    }

    const { date, user, car, startTime, endTime, totalCost } = validationResults.data.body;

    // Convert user and carId strings to Types.ObjectId
    const bookingData = {
      date,
      user: new Types.ObjectId(user),
      car: new Types.ObjectId(car),
      startTime,
      endTime,
      totalCost,
    };

    // Call the service to create a new booking
    const newBooking = await BookingServices.createBookingIntoDB(bookingData);

    // Return the created booking
    return res.status(httpStatus.CREATED).json(newBooking);
  } catch (error) {
    next(error);
  }
};

// Controller to handle other booking-related operations (if needed)
// For example: getBookingById, updateBooking, deleteBooking, etc.

export const BookingController = {
  createBooking,
  // Other controllers can be added here
};
