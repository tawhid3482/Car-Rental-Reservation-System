import mongoose, { Schema, Document } from 'mongoose';
import { TBooking } from './booking.interface';

export interface BookingDocument extends TBooking, Document {}

const BookingSchema: Schema = new Schema({
  date: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  startTime: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
      message: (props: { value: string }) => `${props.value} is not a valid 24-hour time format (HH:mm)`,
    },
  },
  endTime: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
      message: (props: { value: string }) => `${props.value} is not a valid 24-hour time format (HH:mm)`,
    },
  },
  totalCost: { type: Number, default: 0 },
});

const BookingModel = mongoose.model<BookingDocument>('Booking', BookingSchema);

export default BookingModel;
