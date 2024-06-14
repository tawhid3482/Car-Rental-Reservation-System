import { USER_ROLE } from "./user.constant";

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

export interface TUser {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  phone: string;
  address: string;
}

export type TUserRole = keyof typeof USER_ROLE;
