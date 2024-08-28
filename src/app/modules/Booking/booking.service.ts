import httpStatus from "http-status";
import { CarModel } from "../Car/car.model";
import AppError from "../../errors/AppError";
import { Booking } from "./booking.model";
import mongoose, { Types } from "mongoose";
import { TBooking } from "./booking.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { query } from "express";

type TBooks = {
  carId: string;
  date: string;
  startTime: string;
};

const createBookingIntoDB = async (
  payload: TBooks,
  userId: Types.ObjectId
): Promise<TBooking> => {
  const { carId } = payload;

  // Check if the car ID exists
  const car = await CarModel.findById(carId);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found!");
  }

  if (car.status === "unavailable") {
    throw new AppError(httpStatus.NOT_FOUND, "Car is already book!");
  }

  // Update car status to 'unavailable'
  car.status = "unavailable";
  await car.save();

  // Create the booking
  const result = await Booking.create({
    date: payload.date,
    user: userId,
    car: carId,
    startTime: payload.startTime,
    endTime: null,
    totalCost: 0,
  });

  // Populate the car and user fields
  return (await result.populate("car")).populate("user");
};

const getBookingsByCarAndDate = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find().populate("user").populate("car"),
    query
  ).filter();

  const result = await bookingQuery.modelQuery;
  return result;
};

const getBookingsByUserCarFromDb = async (userId: string) => {
  const result = await Booking.find({ user: userId })
    .populate("car")
    .populate("user");
  return result;
};


export const BookingServices = {
  createBookingIntoDB,
  getBookingsByCarAndDate,
  getBookingsByUserCarFromDb,
};
