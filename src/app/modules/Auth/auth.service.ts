import bcrypt from 'bcrypt';

import { JwtPayload } from 'jsonwebtoken';
import { TLoginUser } from './auth.interface';
import UserModel from '../User/user.model';
import config from '../../config';
import { createToken } from './auth.utils';

const login = async (payload: TLoginUser) => {
  const user = await UserModel.findOne({ email: payload.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('User not found !');
  }

  //checking if the password is correct

  const matchPassword = await bcrypt.compare(
    payload.password,
    user.password as string,
  );

  if (!matchPassword) {
    throw new Error('Wrong Password !');
  }

  //create token and send to the  client

  const jwtPayload: JwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  const userData = await UserModel.findOne({ email: payload.email });

  return {
    accessToken,
    userData,
  };
};

export const AuthServices = {
  login,
};