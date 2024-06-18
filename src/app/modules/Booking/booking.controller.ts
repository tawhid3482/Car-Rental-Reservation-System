import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { validateBooking } from "./booking.validation";
import { bookingServices } from "./booking.service";
import sendResponse from "../../utils/sendResponse";


const createBookingController = catchAsync(async (req, res) => {
  const { date, user, car, startTime, endTime } = req.body;

  // Validate the request body
  const requestBody = validateBooking.createBookingValidationSchema.parse(req.body);

  try {
    // Create the booking
    const result = await bookingServices.createBookingIntoDB({
      date,
      user,
      car,
      startTime,
      endTime,
    });

    sendResponse({
      res,
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error:any) {
    sendResponse({
      res,
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
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

// const updateSingleBooking = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const updateData = req.body;

//   // Validate the update data
//   const zodParsedData = validateBooking.createBookingValidationSchema.parse(updateData);

//   try {
//     const updateResult = await bookingServices.updateBookingIntoDB(id, zodParsedData);

//     if (updateResult.nModified === 1) {
//       // Fetch the updated booking data
//       const updatedBooking = await bookingServices.getSingleBookingFromDB(id);

//       sendResponse({
//         res,
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Booking updated successfully",
//         data: updatedBooking,
//       });
//     } else {
//       sendResponse({
//         res,
//         statusCode: httpStatus.NOT_FOUND,
//         success: false,
//         message: "Booking not found or data not modified",
//       });
//     }
//   } catch (error) {
//     sendResponse({
//       res,
//       statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//       success: false,
//       message: "Failed to update booking",
//     });
//   }
// });

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
  // updateSingleBooking,
  deleteSingleBooking,
};
