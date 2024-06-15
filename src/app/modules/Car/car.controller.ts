import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { carServices } from "./car.service";
import { Request, Response } from "express";
import { carValidation } from "./car.validation";

const createCarController = catchAsync(async (req, res) => {
  const result = await carServices.createCarIntoDB(req.body);
  sendResponse({
    res,
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Car  created  successfully",
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
    message: "Cars retrieved successfully",
    data: result,
  });
});

const updateSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const zodParsedData =
    carValidation.carUpdateValidationSchema.parse(updateData);

  const updateResult = await carServices.updateCarIntoDB(id, zodParsedData);

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

export const carController = {
  createCarController,
  getAllCars,
  getSingleCars,
  updateSingleCar,
  deleteSingleCar,
};
