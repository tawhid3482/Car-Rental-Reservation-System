import { Types } from 'mongoose';
import { CarModel } from '../Car/car.model';
import BookingModel from './booking.model';
import { CreateBookingInput, TBooking } from './booking.interface';

const createBookingIntoDB = async (payload: CreateBookingInput, userId: Types.ObjectId) => {
  const { carId, date, startTime, endTime } = payload.body;

  try {
    const carDoc = await CarModel.findById(carId);

    if (!carDoc) {
      throw new Error('Car not found');
    }

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // duration in hours
    const totalCost = duration * carDoc.pricePerHour;

    const bookingData: Omit<TBooking, 'totalCost'> = {
      user: userId,
      car: carId,
      date,
      startTime,
      endTime,
    };

    const result = await BookingModel.create({ ...bookingData, totalCost });
    return result;
  } catch (error) {
    throw new Error(`Error creating booking: ${error.message}`);
  }
};

const getAllBookingsFromDB = async () => {
  try {
    const result = await BookingModel.find();
    return result;
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
};

const getSingleBookingFromDB = async (id: string) => {
  try {
    const result = await BookingModel.findById(id);
    return result;
  } catch (error) {
    throw new Error(`Error fetching booking: ${error.message}`);
  }
};

const updateBookingIntoDB = async (id: string, updateData: Partial<TBooking>) => {
  try {
    const result = await BookingModel.updateOne({ _id: id }, { $set: updateData });
    return result;
  } catch (error) {
    throw new Error(`Error updating booking: ${error.message}`);
  }
};

const deleteSingleBookingFromDB = async (id: string) => {
  try {
    const result = await BookingModel.deleteOne({ _id: id });
    return result;
  } catch (error) {
    throw new Error(`Error deleting booking: ${error.message}`);
  }
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
  deleteSingleBookingFromDB,
};
