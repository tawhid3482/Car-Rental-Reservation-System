import { Types } from "mongoose";

export type TBooking = {
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost?: number | undefined;
  createdAt?: Date; // Add createdAt field
};
