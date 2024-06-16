import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { bookingServices } from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import { bookingUpdateValidationSchema } from "./booking.validation";

const createBookingController = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await bookingServices.createBookingIntoDB(payload);
  sendResponse({
    res,
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookingsFromDB();
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingServices.getSingleBookingFromDB(id);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking retrieved successfully",
    data: result,
  });
});

const updateSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const zodParsedData = bookingUpdateValidationSchema.parse(updateData);

  const updateResult = await bookingServices.updateBookingIntoDB(id, zodParsedData);

  if (updateResult.modifiedCount === 1) {
    const updatedBooking = await bookingServices.getSingleBookingFromDB(id);
    sendResponse({
      res,
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } else {
    sendResponse({
      res,
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Booking not found or data not modified",
    });
  }
});

const deleteSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deleteResult = await bookingServices.deleteSingleBookingFromDB(id);

  if (deleteResult.modifiedCount === 1) {
    const deletedBooking = await bookingServices.getSingleBookingFromDB(id);
    sendResponse({
      res,
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking deleted successfully",
      data: deletedBooking,
    });
  } else {
    sendResponse({
      res,
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Booking not found",
    });
  }
});

export const bookingController = {
  createBookingController,
  getAllBookings,
  getSingleBooking,
  updateSingleBooking,
  deleteSingleBooking,
};
