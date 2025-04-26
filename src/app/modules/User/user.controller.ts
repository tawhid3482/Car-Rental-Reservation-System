import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.createUserIntoDB(req.body);
  const { accessToken, userData } = result;
  return res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User created successfully",
    data: userData,
    token: accessToken,
  });

  // sendResponse({
  //   res,
  //   statusCode: httpStatus.CREATED,
  //   success: true,
  //   message: "User registered successfully",
  //   data: result,
  // });
});

const getUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.getUserByEmailIntoDB(email);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUser();
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const updateUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.updateUserByEmailIntoDB(email,req.body);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const getUserStats= catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getUserStatsIntoDB(id);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "User stats retrieved successfully",
    data: result,
  });
});



export const UserControllers = {
  createUser,
  getUserByEmail,
  getAllUser,
  updateUserByEmail,
  getUserStats
};
