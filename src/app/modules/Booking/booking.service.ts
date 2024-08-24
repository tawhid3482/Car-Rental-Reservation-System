import httpStatus from "http-status";
import { CarModel } from "../Car/car.model";
import AppError from "../../errors/AppError";
import { Booking } from "./booking.model";
import mongoose, { Types } from "mongoose";
import { TBooking } from "./booking.interface";
import QueryBuilder from "../../builder/QueryBuilder";

type TBooks = {
  carId: string;
  date: string;
  startTime: string;
};

const createBookingIntoDB = async (payload: TBooks, userId: Types.ObjectId): Promise<TBooking> => {
  const { carId } = payload;

  // Check if the car ID exists
  const car = await CarModel.findById(carId);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found!");
  }

  // Create the booking
  const result = await Booking.create({
    date: payload.date,
    user: userId, // Associate the booking with the user
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
  console.log(result);
  return result;
};

const getBookingsByUserCarFromDb = async () => {
  const result = await Booking.find();
  return result;
};

// const returnCarBooking = async(payload:TBooksUpdate):Promise<TBooking>=>{
//   const { bookingId } = payload;

  
//   // if (!user) {
//   //   throw new AppError(httpStatus.NOT_FOUND, "User not found!");
//   // }

//   // Check if the car ID exists
//   const booking = await Booking.findById(bookingId);
//   if (!booking) {
//     throw new AppError(httpStatus.NOT_FOUND, "booking id not found!");
//   }

//   const result = await Booking.create({
//     date: payload.date,
//     user: user,
//     car: payload.carId,
//     startTime: payload.startTime,
//     endTime: payload.endTime,
//     totalCost: 0,
//   });
//   return (await result.populate("car")).populate("user");
// }


export const BookingServices = {
  createBookingIntoDB,
  getBookingsByCarAndDate,
  getBookingsByUserCarFromDb,
};
