import mongoose, { Schema, model, Types } from "mongoose";
import { TBooking } from "./booking.interface";

// Booking schema definition
const bookingSchema = new Schema<TBooking>(
  {
    date: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required:true,
      ref: "User",
    },
    car: { type: Schema.Types.ObjectId, required: true, ref: "Car" },
    startTime: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
        message: (props: { value: string }) =>
          `${props.value} is not a valid 24-hour time format (HH:mm)`,
      },
    },
    endTime: {
      type: String,
      validate: {
        validator: (v: string) =>
          v === null || /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
        message: (props: { value: string }) =>
          `${props.value} is not a valid 24-hour time format (HH:mm)`,
      },
      default: null,
    },
    totalCost: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Booking = model<TBooking>("Booking", bookingSchema);
