import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Booking } from "../Booking/booking.model";
import { TCar } from "./car.interface";
import { CarModel } from "./car.model";
import { convertTime } from "../../utils/convertTime";

const createCarIntoDB = async (payload: TCar) => {
  const result = await CarModel.create(payload);
  return result;
};
const getAllCarFromDB = async () => {
  const result = await CarModel.find({ isDeleted: { $ne: true } });
  return result;
};
const getSingleCarFromDB = async (id: string) => {
  const result = await CarModel.findById({ _id: id });
  return result;
};

const updateCarIntoDB = async (id: string, updateData: Partial<TCar>) => {
  const result = await CarModel.updateOne({ _id: id }, { $set: updateData });
  return result;
};
const updateCarLoveIntoDB = async (id: string, updateData: Partial<TCar>) => {
  const result = await CarModel.updateOne({ _id: id }, { $set: updateData });
  return result;
};

const deleteSingleCarFromDB = async (id: string) => {
  const isCarExists = await CarModel.findById(id);
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Car is not found !");
  }
  const result = await CarModel.updateOne(
    { _id: id },
    { $set: { isDeleted: true } }
  );
  return result;
};

const returnTheCarIntoDB = async (bookingId: string, endTime: string) => {
  const isBookingExists = await Booking.findById(bookingId).populate("car");

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
  if (isBookingExists.endTime) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Car has already been returned!"
    );
  }

  const startTime = `${isBookingExists.date} ${isBookingExists.startTime}`;
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const hoursSpent = timeDifference / (1000 * 60 * 60);
  const totalCost = (hoursSpent * isCarExists.pricePerHour).toFixed(2);

  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      endTime: endTime,
      totalCost,
    },
    {
      new: true,
    }
  )
    .populate("car")
    .populate({ path: "user", select: "-password" });
  return updatedBooking;
};

export const carServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteSingleCarFromDB,
  returnTheCarIntoDB,
  updateCarLoveIntoDB,
};
