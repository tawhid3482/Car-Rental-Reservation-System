import httpStatus from 'http-status';
import mongoose from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import { validateBooking } from './booking.validation';
import { BookingServices } from './booking.service';
import sendResponse from '../../utils/sendResponse';


const createBookingController = catchAsync(async (req, res) => {
  const validatedData = validateBooking.createBookingValidation.parse({ body: req.body });
  const { date, user, car, startTime, endTime } = validatedData.body;
  
  const result = await BookingServices.createBookingIntoDB({
    date,
    user: new mongoose.Types.ObjectId(user), // Use 'new' keyword here
    car: new mongoose.Types.ObjectId(car),   // Use 'new' keyword here
    startTime,
    endTime,
  });
  
  sendResponse({
    res,
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB(req.query);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.getSingleBookingFromDB(id);
  if (!result) {
    sendResponse({
      res,
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Booking not found',
    });
    return;
  }
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

const updateSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const validatedData = validateBooking.createBookingValidation.parse({ body: updateData });
  const { date, user, car, startTime, endTime } = validatedData.body;

  const result = await BookingServices.updateBookingIntoDB(id, {
    date,
    user: new mongoose.Types.ObjectId(user),
    car: new mongoose.Types.ObjectId(car),
    startTime,
    endTime,
  });

  if (!result) {
    sendResponse({
      res,
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Booking not found or data not modified',
    });
    return;
  }

  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingFromDB(id);
  if (!result) {
    sendResponse({
      res,
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Booking not found',
    });
    return;
  }
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingController = {
  createBookingController,
  getAllBookings,
  getSingleBooking,
  updateSingleBooking,
  deleteSingleBooking,
};
