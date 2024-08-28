import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBooking } from "../Booking/booking.interface";
import { Booking } from "../Booking/booking.model";
import { TCar, TReturnCar } from "./car.interface";
import { CarModel } from "./car.model";
import { convertTime } from "../../utils/convertTime";

const createCarIntoDB = async (payload: TCar) => {
  const result = await CarModel.create(payload);
  return result;
};
const getAllCarFromDB = async () => {
  const result = await CarModel.find();
  return result;
};
const getSingleCarFromDB = async (id: string) => {
  const result = await CarModel.findById({ _id: id });
  return result;
};

const updateCarIntoDB = async (id: string, updateData:Partial<TCar>) => {
  const result = await CarModel.updateOne({ _id: id }, { $set: updateData });
  return result;
};

const deleteSingleCarFromDB = async (id: string) => {
  const result = await CarModel.updateOne(
    { _id: id },
    { $set: { isDeleted: true } }
  );
  return result;
};

const returnTheCarIntoDB = async (payload: TReturnCar) => {

  const isBookingExists = await Booking.findById(payload.bookingId);
  console.log(payload.bookingId)

  if (!isBookingExists) {
      throw new AppError(httpStatus.NOT_FOUND, "Booking is not found !");
  }
  const isCarExists = await CarModel.findByIdAndUpdate(
      isBookingExists.car,
      {
          status: "available",
      },
      {
          new: true,

      }
  );
  if (!isCarExists) {
      throw new AppError(httpStatus.NOT_FOUND, "Car is not found !");
  }
  const startHours = convertTime(isBookingExists.startTime);
  const endHours = convertTime(payload.endTime);
  let durationHours = endHours - startHours;
  if (durationHours < 0) {
      durationHours += 24;
  }
  const totalCost = Number(durationHours) * Number(isCarExists.pricePerHour);
  const updatedBooking = await Booking.findByIdAndUpdate(
      payload.bookingId,
      {
          endTime: payload.endTime,
          totalCost,
      },
      {
          new: true,

      }
  ).populate("user car");

  return updatedBooking;

}



export const carServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteSingleCarFromDB,
  returnTheCarIntoDB,
};
