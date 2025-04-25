import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";

const signInUser = catchAsync(async (req, res, next) => {
  const result = await AuthServices.signInUserIntoDB(req.body);
  const { accessToken, userData } = result;
  return res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: userData,
    token: accessToken,
  });
});

export const AuthControllers = {
  signInUser,
};
