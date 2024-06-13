import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
    const { password, user: userData } = req.body;
  
    const result = await UserService.createUserIntoDB(password, userData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created succesfully',
      data: result,
    });
  });


  const getUser = catchAsync(async (req, res) => {
    const {id}=req.params
    const result = await UserService.getUserById(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user are retrieved successfully',
      data: result,
    });
  });


  export const UserController = {
    createUser
  } 