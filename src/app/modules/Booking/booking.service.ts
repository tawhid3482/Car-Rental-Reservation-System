import httpStatus from "http-status";
import { CarModel } from "../Car/car.model";
import AppError from "../../errors/AppError";
import { TBookingCreate } from "./booking.interface";
import { Booking } from "./booking.model";
import mongoose from "mongoose";

const createBookingIntoDB = async (payload: TBookingCreate) => {
  const { carId } = payload;

  // Check if the car ID exists
  const isCarIdExists = await CarModel.findById(carId);
  if (!isCarIdExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found!");
  }

  // Create booking
  const result = await Booking.create({
    date: payload.date,
    car: carId,
    startTime: payload.startTime,
    endTime: null,  // Set endTime to null
    user: null,
    totalCost: 0,
  });

  return (await result.populate('user')).populate('car');
};

const getBookingsByCarAndDate = async (carId: string, date: string) => {
  // Convert carId to ObjectId
  const objectIdCarId = new mongoose.Types.ObjectId(carId);

  const bookings = await Booking.find({ car: objectIdCarId, date }).populate('user').populate('car');
  return bookings;
};

export const BookingServices = {
  createBookingIntoDB,
  getBookingsByCarAndDate,
};
