import { Model, Types } from "mongoose";

export interface TBooking {
  date: string; // YYYY-MM-DD format for the booking date
  user: Types.ObjectId; // Reference to the user model
  car: Types.ObjectId; // Reference to the car model
  startTime: string; // HH:mm format for 24-hour time
  endTime: string; // HH:mm format for 24-hour time
  totalCost?: number | undefined; // Total cost of the booking, calculated based on startTime, endTime, and pricePerHour
}
export interface TBookingCreate {
  date: string; // YYYY-MM-DD format for the booking date
  carId: Types.ObjectId; // Reference to the car model
  startTime: string; // HH:mm format for 24-hour time
}

export interface BookingModel extends Model<TBooking, TBookingCreate> {
  isUserExists(id: Types.ObjectId): Promise<TBooking | TBookingCreate | null>;
}
