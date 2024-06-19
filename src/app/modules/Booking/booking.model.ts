import mongoose, { Schema, model, Types } from 'mongoose';
import { BookingModel, TBooking } from './booking.interface';

// Booking schema definition
const bookingSchema = new Schema<TBooking, BookingModel>({
  date: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    ref: 'User',
  },
  car: { type: Schema.Types.ObjectId, required: true, ref: 'Car' },
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

// Static method implementation
bookingSchema.statics.isUserExists = async function (id: Types.ObjectId) {
  return this.findOne({ user: id });
};

// Create and export the Booking model
const Booking = model<TBooking, BookingModel>('Booking', bookingSchema);

export default Booking;
