import mongoose, { Schema, Document, Model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema: Schema = new Schema({
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  car: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Car' },
  startTime: { type: String, required: true },
  endTime: { type: String, default: null },
  totalCost: { type: Number, required: true, default: 0 },
  isDeleted: { type: Boolean, default: false },
});

export interface IBooking extends TBooking, Document {}

const BookingModel: Model<IBooking> = mongoose.model<IBooking>('Booking', bookingSchema);

export { BookingModel };
