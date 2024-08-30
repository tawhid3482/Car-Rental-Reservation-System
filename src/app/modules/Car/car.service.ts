import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBooking } from "../Booking/booking.interface";
import { Booking } from "../Booking/booking.model";
import { TCar } from "./car.interface";
import { CarModel } from "./car.model";

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

const updateCarIntoDB = async (id: string, updateData: Partial<TCar>) => {
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

const returnTheCarIntoDB = async (bookingId: string, endTime: string) => {
  const booking = await Booking.findById(bookingId).populate("car").populate({path:"user",select:'-password'});

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found!");
  }

  if (booking.endTime) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Car has already been returned!"
    );
  }

  // Update booking with end time and calculate total cost
  const hoursUsed =
    (new Date(`1970-01-01T${endTime}Z`).getTime() -
      new Date(`1970-01-01T${booking.startTime}Z`).getTime()) /
    (1000 * 60 * 60);
  booking.endTime = endTime;

  booking.totalCost = hoursUsed * booking?.car?.pricePerHour;

  // Update car status to 'available'
  const car = await CarModel.findById(booking?.car?._id);
  if (car) {
    car.status = "available";
    await car.save();
  } else {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found for update!");
  }

  await booking.save();
  return booking.populate('car');
};

export const carServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteSingleCarFromDB,
  returnTheCarIntoDB,
};
