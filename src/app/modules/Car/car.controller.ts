import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { carServices } from "./car.service";
import { BookingServices } from "../Booking/booking.service";
import AppError from "../../errors/AppError";

const createCarController = catchAsync(async (req, res) => {
  const result = await carServices.createCarIntoDB(req.body);
  sendResponse({
    res,
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Car created successfully",
    data: result,
  });
});

const getAllCars = catchAsync(async (req, res) => {
  const result = await carServices.getAllCarFromDB();
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars retrieved successfully",
    data: result,
  });
});

const getSingleCars = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await carServices.getSingleCarFromDB(id);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "A car retrieved successfully",
    data: result,
  });
});

const updateSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const updateResult = await carServices.updateCarIntoDB(id, updateData);

  if (updateResult.modifiedCount === 1) {
    // Fetch the updated car data
    const updatedCar = await carServices.getSingleCarFromDB(id);

    sendResponse({
      res,
      statusCode: httpStatus.OK,
      success: true,
      message: "Car updated successfully",
      data: updatedCar,
    });
  } else {
    sendResponse({
      res,
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Car not found or data not modified",
    });
  }
});

const deleteSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deleteResult = await carServices.deleteSingleCarFromDB(id);

  if (deleteResult.modifiedCount === 1) {
    const deletedCar = await carServices.getSingleCarFromDB(id);

    sendResponse({
      res,
      statusCode: httpStatus.OK,
      success: true,
      message: "Car deleted successfully",
      data: deletedCar,
    });
  } else {
    sendResponse({
      res,
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Car not found",
    });
  }
});

const returnCarController = catchAsync(async (req, res) => {
  const {bookingId,endTime} = req.body;

  // Validate endTime again in the controller
  if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(endTime)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid time format!");
  }

  const result = await carServices.returnTheCarIntoDB(bookingId,endTime);
  sendResponse({
    res,
    success: true,
    statusCode: httpStatus.OK,
    message: "Car returned successfully",
    data: result,
  });
});

// const returnCarController = catchAsync(async (req, res) => {
//   if (req.path === "/return") {
//     // Handle the return car logic separately
//     const bookingData = req.body;
//     const result = await carServices.returnTheCarIntoDB(bookingData);

//     // Send response after the car return logic is executed
//     sendResponse({
//       res,
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "Car returned successfully",
//       data: result,
//     });
//   } else {
//     // This part should handle updating a car by ID, ensure it's correctly separated
//     const id = req.params.id;
//     const result = await carServices.updateCarIntoDB(id, req.body);

//     if (!result) {
//       res.status(httpStatus.NOT_FOUND).json({
//         success: false,
//         statusCode: httpStatus.NOT_FOUND,
//         message: "Data not found",
//         data: [],
//       });
//       return;
//     }

//     sendResponse({
//       res,
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "Car updated successfully",
//       data: result,
//     });
//   }
// });
export const carController = {
  createCarController,
  getAllCars,
  getSingleCars,
  updateSingleCar,
  deleteSingleCar,
  returnCarController,
};
