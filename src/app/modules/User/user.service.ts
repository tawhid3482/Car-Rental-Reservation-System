/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (userData: TUser): Promise<TUser> => {
  try {
    const user = new UserModel(userData);
    await user.save();
    return user.toObject();
  } catch (err: any) {
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
