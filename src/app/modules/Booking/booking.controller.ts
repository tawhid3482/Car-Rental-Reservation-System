import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { createBookingValidationSchema } from "./booking.validation";
import { bookingServices } from "./booking.service";
import sendResponse from "../../utils/sendResponse";


const createBookingController = catchAsync(async (req, res) => {
  try {
    // Validate the request body
    const validatedData = createBookingValidationSchema.parse(req.body);

    // Destructure validated data
    const { carId, date, startTime, endTime } = validatedData;

    // Example: Fetch user from authentication middleware
    const user = req.user; // Assuming req.user contains authenticated user data

    // Create the booking payload
    const payload = {
      user: user._id, // Assuming user._id is the ObjectId of the authenticated user
      car: carId,
      date,
      startTime,
      endTime,
    };

    // Create the booking
    const result = await bookingServices.createBookingIntoDB(payload);

    sendResponse({
      res,
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Validation Error",
    });
  }
});
const getAllBookings = catchAsync(async (req, res) => {
  try {
    const result = await bookingServices.getAllBookingsFromDB();
    sendResponse({
      res,
      statusCode: httpStatus.OK,
      success: true,
      message: "All bookings retrieved successfully",
      data: result,
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to fetch bookings",
    });
  }
});

const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await bookingServices.getSingleBookingFromDB(id);

    if (!result) {
      sendResponse({
        res,
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Booking not found",
      });
    } else {
      sendResponse({
        res,
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking retrieved successfully",
        data: result,
      });
    }
  } catch (error) {
    sendResponse({
      res,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to fetch booking",
    });
  }
});

const deleteSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteResult = await bookingServices.deleteSingleBookingFromDB(id);

    if (deleteResult.deletedCount === 1) {
      sendResponse({
        res,
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking deleted successfully",
      });
    } else {
      sendResponse({
        res,
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Booking not found",
      });
    }
  } catch (error) {
    sendResponse({
      res,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to delete booking",
    });
  }
});

export const bookingController = {
  createBookingController,
  getAllBookings,
  getSingleBooking,
  deleteSingleBooking,
};
