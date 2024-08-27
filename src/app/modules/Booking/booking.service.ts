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

const returnCarBookingInDb = async (bookingId: string, endTime: string) => {
  console.log(bookingId);

  const booking = await Booking.findById(bookingId)
    .populate("car")
    .populate("user");

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found!");
  }

  if (booking.endTime) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Car has already been returned!"
    );
  }

  // Update car status to 'available'

  // Update booking with end time and calculate total cost

  const hoursUsed =
    (new Date(`1970-01-01T${endTime}Z`).getTime() -
      new Date(`1970-01-01T${booking.startTime}Z`).getTime()) /
    (1000 * 60 * 60);
  booking.endTime = endTime;

  booking.totalCost = hoursUsed * booking?.car?.pricePerHour;

  await booking.save();

  // Update car status to 'available'
  const car = await CarModel.findById(booking.car._id);
  if (car) {
    car.status = "available";
    await car.save();
  } else {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found for update!");
  }

  return booking;
};

export const BookingServices = {
  createBookingIntoDB,
  getBookingsByCarAndDate,
  getBookingsByUserCarFromDb,
  returnCarBookingInDb,
};
