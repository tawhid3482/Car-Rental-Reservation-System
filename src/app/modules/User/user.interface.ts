// import { Model } from "mongoose";
// import { USER_ROLE } from "./user.constant";

// export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

type UserRole = 'admin' | 'user';


export interface TUser {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  phone: string;
  address: string;
}

// export interface UserModel extends Model<TUser> {
//   //instance methods for checking if the user exist
//   isUserExistsByCustomId(id: string): Promise<TUser>;
//   //instance methods for checking if passwords are matched
//   isPasswordMatched(
//     plainTextPassword: string,
//     hashedPassword: string,
//   ): Promise<boolean>;
//   isJWTIssuedBeforePasswordChanged(
//     passwordChangedTimestamp: Date,
//     jwtIssuedTimestamp: number,
//   ): boolean;
// }


// export type TUserRole = keyof typeof USER_ROLE;
