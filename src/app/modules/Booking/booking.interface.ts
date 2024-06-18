

import { Types } from "mongoose";

export type TBooking = {
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
};

export type TSchedule = {
  date: string;
  startTime: string;
  endTime: string;
};
