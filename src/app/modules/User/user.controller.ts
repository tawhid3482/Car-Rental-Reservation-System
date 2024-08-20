import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse({
    res,
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
