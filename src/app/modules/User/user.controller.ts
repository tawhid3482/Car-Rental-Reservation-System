// import { Request, Response } from "express";
// import sendResponse from "../../utils/sendResponse";
// import httpStatus from "http-status";
// import catchAsync from "../../utils/catchAsync";
// import { UserService } from "./user.service";
// import {
//   signInValidationSchema,
//   userValidationSchema,
// } from "./user.validation";

// const createUserController = catchAsync(async (req: Request, res: Response) => {
//   // Validate request body
//   userValidationSchema.parse(req.body);

//   const userData = req.body;

//   const result = await UserService.createUserIntoDB(userData);

//   sendResponse({
//     res,
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: "User registered successfully",
//     data: result,
//   });
// });

// const signInUserController = catchAsync(async (req: Request, res: Response) => {
//   // Validate request body
//   signInValidationSchema.parse(req.body);
//   const { email, password } = req.body;
//   const result = await UserService.signInUserIntoDB(email, password);

//   sendResponse({
//     res,
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User signed in successfully",
//     data: result,
//   });
// });

// export const UserController = {
//   createUserController,
//   signInUserController,
// };

import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserServices.createUser(req.body);

    sendResponse({
      res,
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User registered  successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createUser,
};
