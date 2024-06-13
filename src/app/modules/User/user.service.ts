/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import config from "../../config";

const createUserIntoDB = async (password: string, payload: TUser): Promise<TUser> => {
  // create a user object
  const userData: Partial<TUser> = {};

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const newUser = await UserModel.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    await session.commitTransaction();
    await session.endSession();

    return newUser[0].toObject();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

const getUserById = async (userId: string): Promise<TUser | null> => {
  try {
    const user = await UserModel.findById(userId).exec();
    return user ? user.toObject() : null;
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

const getUserByEmail = async (email: string): Promise<TUser | null> => {
  try {
    const user = await UserModel.findOne({ email }).exec();
    return user ? user.toObject() : null;
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

const updateUser = async (userId: string, updateData: Partial<TUser>): Promise<TUser | null> => {
  try {
    const user = await UserModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
    return user ? user.toObject() : null;
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

const deleteUser = async (userId: string): Promise<TUser | null> => {
  try {
    const user = await UserModel.findByIdAndDelete(userId).exec();
    return user ? user.toObject() : null;
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

const changeUserRole = async (userId: string, newRole: 'user' | 'admin'): Promise<TUser | null> => {
  try {
    const user = await UserModel.findByIdAndUpdate(userId, { role: newRole }, { new: true }).exec();
    return user ? user.toObject() : null;
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

const updateUserPassword = async (userId: string, newPassword: string): Promise<TUser | null> => {
  try {
    const user = await UserModel.findByIdAndUpdate(userId, { password: newPassword }, { new: true }).exec();
    return user ? user.toObject() : null;
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

const updateUserAddress = async (userId: string, newAddress: string): Promise<TUser | null> => {
  try {
    const user = await UserModel.findByIdAndUpdate(userId, { address: newAddress }, { new: true }).exec();
    return user ? user.toObject() : null;
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

export const UserService = {
  createUserIntoDB,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  changeUserRole,
  updateUserPassword,
  updateUserAddress,
};
