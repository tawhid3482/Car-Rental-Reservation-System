import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { BookingServices } from './booking.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';

// Create a new booking
const createBookingController = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.createBookingIntoDB(req.body);
  sendResponse({
    res,
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Car booked successfully",
    data: result,
  });
});


const getBookingsByCarAndDateController = catchAsync(async (req: Request, res: Response) => {
  const { carId, date } = req.query;
  if (carId && typeof carId !== 'string') {
    throw new AppError(httpStatus.BAD_REQUEST, "carId must be a string");
  }

  if (date && typeof date !== 'string') {
    throw new AppError(httpStatus.BAD_REQUEST, "date must be a string");
  }

  const result = await BookingServices.getBookingsByCarAndDate();
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});


export const BookingController = {
  createBookingController,
  getBookingsByCarAndDateController,
};
