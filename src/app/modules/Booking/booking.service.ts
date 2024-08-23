import httpStatus from "http-status";
import { CarModel } from "../Car/car.model";
import AppError from "../../errors/AppError";
import { Booking } from "./booking.model";
import mongoose from "mongoose";
import { TBooking } from "./booking.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import UserModel from "../User/user.model";

type TBooks = {
  carId: string;
  date: string;
  startTime: string;
};

const createBookingIntoDB = async (payload: TBooks): Promise<TBooking> => {
  const { carId } = payload;

  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  // Check if the car ID exists
  const car = await CarModel.findById(carId);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found!");
  }

  const result = await Booking.create({
    date: payload.date,
    user: payload.userId,
    car: payload.carId,
    startTime: payload.startTime,
    endTime: null,
    totalCost: 0,
  });
  return (await result.populate("car")).populate("user");
};

const getBookingsByCarAndDate = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find().populate("user").populate("car"),
    query
  ).filter();

  const result = await bookingQuery.modelQuery;
  console.log(result);
  return result;
};

const getBookingsByUserCarFromDb = async () => {
  const result = await Booking.find();
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getBookingsByCarAndDate,
  getBookingsByUserCarFromDb,
};
