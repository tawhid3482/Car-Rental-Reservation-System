import mongoose, { Schema, model } from "mongoose";
import { TBooking, bookingModel } from "./booking.interface";

// export interface BookingDocument extends TBooking, Document {}

const bookingSchema = new Schema<TBooking, bookingModel>({
  date: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User id is required"],
    unique: true,
    ref: "User",
  },
  car: { type: Schema.Types.ObjectId, required:true, ref:"Car" },
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
    required: true,
    validate: {
      validator: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
      message: (props: { value: string }) =>
        `${props.value} is not a valid 24-hour time format (HH:mm)`,
    },
  },
  totalCost: { type: Number, default: 0 },
});

const Booking = model<TBooking,bookingModel>("Booking", bookingSchema);

export default Booking;
