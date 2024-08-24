import { TBooking } from "../Booking/booking.interface";
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
  const result = await CarModel.findById({_id:id});
  return result;
};

const updateCarIntoDB = async (id: string, updateData: TCar) => {
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

const returnTheCarIntoDB = async (updateData: TBooking) => {
  const result = await CarModel.updateOne({ $set: updateData });
  return result;
};


export const carServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteSingleCarFromDB,
  returnTheCarIntoDB
};
