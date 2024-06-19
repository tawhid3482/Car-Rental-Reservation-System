import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { CarModel } from "../Car/car.model";
import { TBooking } from "./booking.interface";

const createBookingIntoDB = async (payload: TBooking) => {
  const { date, user, car, startTime, endTime } = payload;

  const isCarIdExits =
  await CarModel.findById();

if (!isCarIdExits) {
  throw new AppError(
    httpStatus.NOT_FOUND,
    'Car not found!',
  );
}
};

export const BookingServices = {
  createBookingIntoDB,
};
