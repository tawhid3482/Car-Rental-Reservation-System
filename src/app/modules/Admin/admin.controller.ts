import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AdminServices } from "./admin.service";

const getAdminStats = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await AdminServices.getAdminStatsIntoDB(email);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin stats retrieved successfully",
    data: result,
  });
});

export const AdminControllers = {
  getAdminStats,
};
