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

const updateSingleCar = catchAsync(async(req,res)=>{
    const { id } = req.params;
    const updateData = req.body;
    const zodParsedData = carValidation.carValidationSchema.parse(updateData);

    const result = await carServices.updateCarIntoDB(
      id,
      zodParsedData,
    );
})


export const carController = {
  createCarController,
  getAllCars,
  getSingleCars,
};
