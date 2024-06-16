import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { BookingServices } from './booking.service';
import sendResponse from '../../utils/sendResponse';


const createBookingController = catchAsync(async (req, res) => {
  const { carId, date, startTime } = req.body;

  const bookingData = {
    car: carId,
    date,
    startTime,
    endTime: req.body.endTime, // Assuming endTime is also in req.body
    user: req.body.userId // Assuming userId is available in req.body
  };

  const newBooking = await BookingServices.createBookingIntoDB(bookingData);
  sendResponse({
    res,
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking created successfully',
    data: newBooking,
  });
});

const getAllBookingsController = catchAsync(async (req, res) => {
  const bookings = await BookingServices.getAllBookingsFromDB();
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: bookings,
  });
});

const getSingleBookingController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const booking = await BookingServices.getBookingByIdFromDB(id);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully',
    data: booking,
  });
});

const updateBookingController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = {
    car: req.body.carId,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    user: req.body.userId,
    totalCost: req.body.totalCost
  };

  const updatedBooking = await BookingServices.updateBookingIntoDB(id, updateData);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: updatedBooking,
  });
});

const deleteBookingController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedBooking = await BookingServices.deleteSingleBookingFromDB(id);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: deletedBooking,
  });
});

export const BookingController = {
  createBookingController,
  getAllBookingsController,
  getSingleBookingController,
  updateBookingController,
  deleteBookingController,
};
