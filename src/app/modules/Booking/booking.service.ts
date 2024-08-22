import httpStatus from "http-status";
import { CarModel } from "../Car/car.model";
import AppError from "../../errors/AppError";
import { Booking } from "./booking.model";
import mongoose from "mongoose";
import { TBooking } from "./booking.interface";

type TBooks ={
  carId: string;
  userId: string;
  date: string;
  startTime: string;
}

const createBookingIntoDB = async (payload:TBooks):Promise<TBooking> => {
  const { carId } = payload;

  // Check if the car ID exists
  const car = await CarModel.findById(carId);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found!");
  }
    // // Assuming the user ID is coming from payload or session (mocked for now)
  // const userId = "6071f0fbf98b210012345688"; // Replace this with actual user ID
  // const user = await UserModel.findById(userId);
  // if (!user) {
  //   throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  // }
  const result = await Booking.create({
    date: payload.date,
    car: payload.carId,  
    startTime: payload.startTime,
    endTime: null,
    user: null,
    totalCost: 0,
  });
  return (await result.populate('car')).populate('user');
};





const getBookingsByCarAndDate = async () => {
  const result = await Booking.find()
  return result
};

export const BookingServices = {
  createBookingIntoDB,
  getBookingsByCarAndDate,
};
