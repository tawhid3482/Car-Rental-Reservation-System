import { Request, Response } from "express";
import httpStatus from "http-status";
import { BookingServices } from "./booking.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../errors/AppError";

// Create a new booking
const createBookingController = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const result = await BookingServices.createBookingIntoDB(req.body, userId);

    sendResponse({
      res,
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Car booked successfully",
      data: result,
    });
  }
);

const getBookingsByCarAndDateController = catchAsync(async (req, res) => {
  const result = await BookingServices.getBookingsByCarAndDate(req.query);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getBookingsByUserCar = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const result = await BookingServices.getBookingsByUserCarFromDb(userId);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "My Bookings retrieved successfully",
    data: result,
  });
});

// const returnCarController = catchAsync(async (req: Request, res: Response) => {
//   const { bookingId, endTime } = req.body;
//   console.log(bookingId,endTime)

//     // Validate endTime again in the controller
//     if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(endTime)) {
//       throw new AppError(httpStatus.BAD_REQUEST, "Invalid time format!");
//     }

//   const updatedBooking = await BookingServices.returnCarBookingInDb(bookingId, endTime);

//   sendResponse({
//     res,
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Car returned successfully",
//     data: updatedBooking,
//   });
// });



export const BookingController = {
  createBookingController,
  getBookingsByCarAndDateController,
  getBookingsByUserCar,
  // returnCarController
};
