import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { Booking } from "./model";

const createBookingIntoDB = async (
  payload: Omit<TBooking, "totalCost"> & { pricePerHour: number, userId: string, carId: string }
) => {
  const bookingInstance = new Booking(payload);
  const result = await BookingModel.create({
    ...payload,
    user: payload.userId,
    car: payload.carId,
    totalCost: bookingInstance.totalCost,
  });
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

const updateBookingIntoDB = async (
  id: string,
  updateData: Partial<
    Omit<TBooking, "totalCost"> & { pricePerHour?: number } & {
      totalCost?: number;
    }
  >
) => {
  if (
    updateData.startTime ||
    updateData.endTime ||
    updateData.pricePerHour !== undefined
  ) {
    const booking = await BookingModel.findById(id);
    if (!booking) {
      throw new Error("Booking not found");
    }
    const { date, user, car, startTime, endTime, pricePerHour } = {
      ...booking.toObject(),
      ...updateData,
    };
    // const bookingInstance = new Booking({
    //   date,
    //   user,
    //   car,
    //   startTime,
    //   endTime,
    //   pricePerHour: pricePerHour || 0,
    // });
    // updateData.totalCost = bookingInstance.totalCost;
  }

  const result = await BookingModel.updateOne(
    { _id: id },
    { $set: updateData }
  );
  return result;
};

const deleteSingleBookingFromDB = async (id: string) => {
  const result = await BookingModel.updateOne(
    { _id: id },
    { $set: { isDeleted: true } }
  );
  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
  deleteSingleBookingFromDB,
};
