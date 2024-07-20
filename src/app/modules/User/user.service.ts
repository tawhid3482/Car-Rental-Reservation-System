
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  // Create a new object without the password field
  const hiddenPassword = {
    ...result.toObject(),
    password: undefined,
  };

  return hiddenPassword;
};

const signInUserIntoDB = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  // Generate a JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    config.jwt_access_secret as string,
    { expiresIn: "1h" }
  );

  return { user, token };
};

export const UserServices = {
  createUserIntoDB,
  signInUserIntoDB,
};
