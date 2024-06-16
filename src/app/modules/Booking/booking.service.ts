import { BookingModel } from "./booking.model";
import { Booking } from "./model";
import { UserModel } from "../User/user.model"; // Adjust path as necessary
import { CarModel } from "../Car/car.model"; // Adjust path as necessary
import { TBooking } from "./booking.interface";

const createBookingIntoDB = async (
  payload: { date: Date, userId: string, carId: string, startTime: string, endTime: string | null, pricePerHour: number }
) => {
  const { date, userId, carId, startTime, endTime, pricePerHour } = payload;
  
  const bookingInstance = new Booking({
    date,
    user: userId,
    car: carId,
    startTime,
    endTime,
    pricePerHour
  });

  const createdBooking = await BookingModel.create({
    date: bookingInstance.date,
    user: bookingInstance.user,
    car: bookingInstance.car,
    startTime: bookingInstance.startTime,
    endTime: bookingInstance.endTime,
    totalCost: bookingInstance.totalCost,
  });

  // Populate user and car data
  const populatedBooking = await BookingModel.findById(createdBooking._id)
    .populate('user')
    .populate('car');

  if (!populatedBooking) {
    throw new Error('Failed to populate booking details');
  }

  return populatedBooking;
};

const getAllBookingsFromDB = async () => {
  const result = await BookingModel.find().populate('user').populate('car');
  return result;
};

const getSingleBookingFromDB = async (id: string) => {
  const result = await BookingModel.findById(id).populate('user').populate('car');
  return result;
};

const updateBookingIntoDB = async (
  id: string,
  updateData: Partial<TBooking & { pricePerHour?: number }>
) => {
  if (updateData.startTime || updateData.endTime || updateData.pricePerHour !== undefined) {
    const booking = await BookingModel.findById(id);
    if (!booking) throw new Error("Booking not found");
    const { date, user, car, startTime, endTime, pricePerHour } = { ...booking.toObject(), ...updateData };
    const bookingInstance = new Booking({ date, user: user, car: car, startTime, endTime, pricePerHour: pricePerHour || 0 });
    updateData.totalCost = bookingInstance.totalCost;
  }

  const result = await BookingModel.updateOne({ _id: id }, { $set: updateData });
  return result;
};

const deleteSingleBookingFromDB = async (id: string) => {
  const result = await BookingModel.updateOne({ _id: id }, { $set: { isDeleted: true } });
  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
  deleteSingleBookingFromDB,
};
