import { TUser } from "./user.interface";
import UserModel from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  // Create a new object without the password field
  const hiddenPassword = {
    ...result.toObject(),
    password: undefined,
  };
  // console.log(hiddenPassword)
  return hiddenPassword;
};

export const UserServices = {
  createUserIntoDB,
};
