import { Types } from 'mongoose';
import bookingModel, { IBooking } from './booking.model';
import { validateBooking } from './booking.validation';

// Create a new booking
 const createBookingIntoDB = async (bookingData: Partial<IBooking>) => {
  const validationResult = validateBooking(bookingData);
  if (!validationResult.success) {
    throw new Error('Validation failed: ' + validationResult.error.errors.map(err => err.message).join(', '));
  }

  const booking = new bookingModel({
    ...validationResult.data,
    user: new Types.ObjectId(bookingData.user),
    car: new Types.ObjectId(bookingData.car),
  });

  await booking.save();
  return booking;
};

// Get a booking by ID
 const getBookingByIdFromDB = async (id: string) => {
  const booking = await bookingModel.findById(id).populate('user').populate('car');
  if (!booking) {
    throw new Error('Booking not found');
  }
  return booking;
};

// Update a booking
 const updateBookingIntoDB = async (id: string, updateData: Partial<IBooking>) => {
  const validationResult = validateBooking(updateData);
  if (!validationResult.success) {
    throw new Error('Validation failed: ' + validationResult.error.errors.map(err => err.message).join(', '));
  }

  const booking = await bookingModel.findByIdAndUpdate(id, validationResult.data, { new: true });
  if (!booking) {
    throw new Error('Booking not found');
  }
  return booking;
};

// Delete a booking
 const deleteSingleBookingFromDB = async (id: string) => {
  const booking = await bookingModel.findByIdAndDelete(id);
  if (!booking) {
    throw new Error('Booking not found');
  }
  return booking;
};

// Get all bookings
 const getAllBookingsFromDB = async () => {
  const bookings = await bookingModel.find().populate('user').populate('car');
  return bookings;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getBookingByIdFromDB,
  updateBookingIntoDB,
  deleteSingleBookingFromDB,
}