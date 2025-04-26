import "dotenv/config";
import { createToken } from "../Auth/auth.utils";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Booking } from "../Booking/booking.model";

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  // Create a new object without the password field

  // Create token and send to the client
  const jwtPayload: JwtPayload = {
    id: result.id,
    name: result.name,
    email: result.email,
    role: result.role,
  };

  const accessToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    process.env.JWT_ACCESS_EXPIRES_IN as string
  );

  const userData = await UserModel.findOne({ email: payload.email }).select(
    "-password"
  );
  return {
    accessToken,
    userData,
  };

  // const hiddenPassword = {
  //   ...result.toObject(),
  //   password: undefined,
  // };
  // // console.log(hiddenPassword)
  // return hiddenPassword;
};

const getAllUser = async () => {
  const result = await UserModel.find().select("-password");
  return result;
};
const getUserByEmailIntoDB = async (email: string) => {
  const result = await UserModel.findOne({ email }).select("-password");
  return result;
};

const updateUserByEmailIntoDB = async (email: string, payload: TUser) => {
  const isUserExits = await UserModel.findOne({ email });
  if (!isUserExits) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not Found!");
  }
  console.log(email, payload);
  const updatedUser = await UserModel.findOneAndUpdate(
    { email },
    { $set: payload },
    { new: true } // returns the updated document
  );

  return updatedUser;
};

const getUserStatsIntoDB = async (id: string) => {
  // Validate user existence
  const user = await UserModel.findById(id); // ✅ fix here

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not Found!");
  }

  // Fetch user's bookings
  const bookings = await Booking.find({ user: id }); // ✅ fix here (match field 'user' in Booking)

  const now = new Date();

  // Calculate stats
  const totalBookings = bookings.length;

  const totalSpend = bookings.reduce(
    (sum, booking) => sum + (booking.totalCost || 0),
    0
  );

  const returnedCars = bookings.filter((booking) => {
    return booking.endTime && new Date(booking.endTime) < now;
  }).length;

  const notReturnedCars = bookings.filter((booking) => {
    return !booking.endTime || new Date(booking.endTime) >= now;
  }).length;

  return {
    totalBookings,
    totalSpend,
    returnedCars,
    notReturnedCars,
  };
};

export const UserServices = {
  createUserIntoDB,
  getAllUser,
  getUserByEmailIntoDB,
  updateUserByEmailIntoDB,
  getUserStatsIntoDB,
};
