// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import config from "../../config";
// import { TUser } from "./user.interface";
// import AppError from "../../errors/AppError";
// import httpStatus from "http-status";
// import { User } from "./user.model";

// const createUserIntoDB = async (payload: TUser) => {
//   // Hash the password
//   const hashedPassword = await bcrypt.hash(payload.password, 10);
//   const userData: TUser = { ...payload, password: hashedPassword };

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     // Create a user (transaction-1)
//     const newUser = await User.create([userData], { session }); // array

//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
//     }

//     await session.commitTransaction();
//     session.endSession();
//     return newUser[0]; // Return the created user object
//   } catch (err: any) {
//     await session.abortTransaction();
//     session.endSession();
//     throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
//   }
// };

// const signInUserIntoDB = async (email: string, password: string) => {
//   const user = await User.findOne({ email }).select("+password");

//   if (!user) {
//     throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
//   }

//   // Compare the provided password with the hashed password in the database
//   const isPasswordMatch = await bcrypt.compare(password, user.password);

//   if (!isPasswordMatch) {
//     throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or passwords");
//   }

//   // Generate a JWT token
//   const token = jwt.sign(
//     { id: user._id, email: user.email, role: user.role },
//     config.jwt_access_secret as string,
//     { expiresIn: "1h" }
//   );

//   return { user, token };
// };

// export const UserService = {
//   createUserIntoDB,
//   signInUserIntoDB,
// };

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
