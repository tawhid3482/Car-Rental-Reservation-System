import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { CarModel } from "../Car/car.model";
import { TBooking } from "./booking.interface";
import Booking from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const { date, user, car, startTime, endTime, totalCost } = payload;

  // Check if the car ID exists
  const isCarIdExists = await CarModel.findById(car);
  if (!isCarIdExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found!");
  }

  // Create a new booking instance
  const booking = new Booking({
    date,
    user,
    car,
    startTime,
    endTime,
    totalCost,
  });

  // Save the booking to the database
  await booking.save();

  return booking;
};

export const BookingServices = {
  createBookingIntoDB,
};
