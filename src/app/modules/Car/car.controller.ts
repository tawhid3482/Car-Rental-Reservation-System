import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { carServices } from "./car.service"

const  createCarController =catchAsync(async(req,res)=>{
    const result = await carServices.createCarIntoDB(req.body)
    sendResponse({
        res,
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Car  created  successfully",
        data: result,
      });

})

export const carController = {
    createCarController,
}