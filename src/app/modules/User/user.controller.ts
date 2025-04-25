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

export const UserControllers = {
  createUser,
};
