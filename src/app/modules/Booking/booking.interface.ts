import { Model, Types } from 'mongoose';

export interface TBooking {
  date: string; // YYYY-MM-DD format for the booking date
  user: Types.ObjectId; // Reference to the user model
  car: Types.ObjectId; // Reference to the car model
  startTime: string; // HH:mm format for 24-hour time
  endTime: string; // HH:mm format for 24-hour time
  totalCost: number; // Total cost of the booking, calculated based on startTime, endTime, and pricePerHour
}

export interface bookingModel extends Model<TBooking> {
  isUserExists(id: string): Promise<TBooking | null>;
}