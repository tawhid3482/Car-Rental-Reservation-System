
import { Types } from "mongoose";
import { CarModel } from "./car.model";
import { TBooking } from "../Booking/booking.interface";
import BookingModel from "../Booking/booking.model";

const createBookingIntoDB = async (payload: Omit<TBooking, 'totalCost'>) => {
  const { startTime, endTime, car } = payload;
  const carDoc = await CarModel.findById(car);
  
  if (!carDoc) {
    throw new Error('Car not found');
  }
  
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);
  const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // duration in hours
  const totalCost = duration * carDoc.pricePerHour;
  
  const result = await BookingModel.create({ ...payload, totalCost });
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await BookingModel.find();
  return result;
};

const getSingleBookingFromDB = async (id: string) => {
  const result = await BookingModel.findById(id);
  return result;
};

const updateBookingIntoDB = async (id: string, updateData: Partial<TBooking>) => {
  const result = await BookingModel.updateOne({ _id: id }, { $set: updateData });
  return result;
};

const deleteSingleBookingFromDB = async (id: string) => {
  const result = await BookingModel.deleteOne({ _id: id });
  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
  deleteSingleBookingFromDB,
};
