import mongoose, { Schema, Document, Model } from 'mongoose';
import { TBooking } from './booking.interface';

// Create a schema corresponding to the document interface.
const bookingSchema: Schema = new Schema({
  date: { type: Date, required: true },
  user: { type: String, required: true, ref: 'User' }, // Assuming User is another model
  car: { type: String, required: true, ref: 'Car' }, // Assuming Car is another model
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  totalCost: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
});

// Define a Mongoose document based on the TBooking interface
export interface IBooking extends TBooking, Document {}

// Create the model using the schema
const BookingModel: Model<IBooking> = mongoose.model<IBooking>('Booking', bookingSchema);

export { BookingModel };
