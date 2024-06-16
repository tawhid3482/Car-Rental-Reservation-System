import mongoose, { Schema, Document } from 'mongoose';

// Define the interfaces
export interface IBooking extends Document {
  date: Date;
  user: mongoose.Types.ObjectId;
  car: mongoose.Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
}
const BookingSchema: Schema = new Schema({
  date: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: mongoose.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  totalCost: {
    type: Number,
    required: true,
    default: 0
  }
});

// Pre-save middleware to calculate the totalCost before saving
BookingSchema.pre<IBooking>('save', function (next) {
  const booking = this;
  const startHour = parseInt(booking.startTime.split(':')[0]);
  const startMinute = parseInt(booking.startTime.split(':')[1]);
  const endHour = parseInt(booking.endTime.split(':')[0]);
  const endMinute = parseInt(booking.endTime.split(':')[1]);

  const startTime = startHour + startMinute / 60;
  const endTime = endHour + endMinute / 60;

  const duration = endTime - startTime;

  const pricePerHour = 20; // example rate

  booking.totalCost = duration * pricePerHour;
  next();
});

export default mongoose.model<IBooking>('Booking', BookingSchema);
