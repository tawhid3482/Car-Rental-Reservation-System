import "dotenv/config";
import { createToken } from "../Auth/auth.utils";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import { JwtPayload } from "jsonwebtoken";

const createUserIntoDB = async (payload: TUser) => {
  console.log(payload)
  const result = await UserModel.create(payload);
  // Create a new object without the password field

  // Create token and send to the client
  const jwtPayload: JwtPayload = {
    name:result.name,
    email: result.email,
    role: result.role,
  };

  const accessToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    process.env.JWT_ACCESS_EXPIRES_IN as string
  );

  const userData = await UserModel.findOne({ email: payload.email }).select(
    "-password"
  );
  return {
    accessToken,
    userData,
  };


  // const hiddenPassword = {
  //   ...result.toObject(),
  //   password: undefined,
  // };
  // // console.log(hiddenPassword)
  // return hiddenPassword;
};

export const UserServices = {
  createUserIntoDB,
};
