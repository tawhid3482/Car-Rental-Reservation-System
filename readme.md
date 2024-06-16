this is my interface.ts code
export interface TBooking {
    date: Date;
    user: string; // Reference to user model
    car: string; // Reference to car model
    startTime: string; // In 24hr format, e.g., "14:00"
    endTime: string; // In 24hr format, e.g., "16:00"
    totalCost: number; // Total cost of the booking
}

this is my booking.model.ts code
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

this is my model .ts code
import { TBooking } from "./booking.interface";
import { bookingSchema } from "./booking.validation";


class Booking implements TBooking {
    date: Date;
    user: string;
    car: string;
    startTime: string;
    endTime: string;
    totalCost: number;

    constructor(data: Omit<TBooking, 'totalCost'> & { pricePerHour: number }) {
        const { date, user, car, startTime, endTime, pricePerHour } = data;

        // Validate data using Zod schema
        const result = bookingSchema.safeParse({ date, user, car, startTime, endTime, totalCost: 0 });

        if (!result.success) {
            throw new Error(`Invalid booking data: ${JSON.stringify(result.error.format())}`);
        }

        this.date = date;
        this.user = user;
        this.car = car;
        this.startTime = startTime;
        this.endTime = endTime;
        this.totalCost = this.calculateTotalCost(startTime, endTime, pricePerHour);
    }

    private calculateTotalCost(startTime: string, endTime: string, pricePerHour: number): number {
        const start = this.convertToMinutes(startTime);
        const end = this.convertToMinutes(endTime);
        const duration = (end - start) / 60; // Convert minutes to hours
        return duration * pricePerHour;
    }

    private convertToMinutes(time: string): number {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }
}

export { Booking };

this is my validation code
import { z } from 'zod';

// Define a Zod schema for time in "HH:MM" 24-hour format
const timeSchema = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
  message: "Time must be in 24-hour format HH:MM",
});

// Define the Zod schema for Booking
const bookingSchema = z.object({
  date: z.date(),
  user: z.string(),
  car: z.string(),
  startTime: timeSchema,
  endTime: timeSchema,
  totalCost: z.number().nonnegative(),
});

// Define the Zod schema for updating Booking (partial update)
const bookingUpdateValidationSchema = z.object({
  date: z.date().optional(),
  user: z.string().optional(),
  car: z.string().optional(),
  startTime: timeSchema.optional(),
  endTime: timeSchema.optional(),
  totalCost: z.number().nonnegative().optional(),
});

// Type inference for Booking
type Booking = z.infer<typeof bookingSchema>;

export { bookingSchema, bookingUpdateValidationSchema, Booking };

this is my service code
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { Booking } from "./model";

const createBookingIntoDB = async (
  payload: Omit<TBooking, "totalCost"> & { pricePerHour: number }
) => {
  const bookingInstance = new Booking(payload);
  const result = await BookingModel.create({
    ...payload,
    totalCost: bookingInstance.totalCost,
  });
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await BookingModel.find();
  return result;
};

const getSingleBookingFromDB = async (id: string) => {
  const result = await BookingModel.findById(id);
  return result;
};

const updateBookingIntoDB = async (
  id: string,
  updateData: Partial<
    Omit<TBooking, "totalCost"> & { pricePerHour?: number } & {
      totalCost?: number;
    }
  >
) => {
  if (
    updateData.startTime ||
    updateData.endTime ||
    updateData.pricePerHour !== undefined
  ) {
    const booking = await BookingModel.findById(id);
    if (!booking) {
      throw new Error("Booking not found");
    }
    const { date, user, car, startTime, endTime, pricePerHour } = {
      ...booking.toObject(),
      ...updateData,
    };
    const bookingInstance = new Booking({
      date,
      user,
      car,
      startTime,
      endTime,
      pricePerHour: pricePerHour || 0,
    });
    updateData.totalCost = bookingInstance.totalCost;
  }

  const result = await BookingModel.updateOne(
    { _id: id },
    { $set: updateData }
  );
  return result;
};

const deleteSingleBookingFromDB = async (id: string) => {
  const result = await BookingModel.updateOne(
    { _id: id },
    { $set: { isDeleted: true } }
  );
  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
  deleteSingleBookingFromDB,
};

this is my controller code
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { bookingServices } from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import { bookingUpdateValidationSchema } from "./booking.validation";

const createBookingController = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await bookingServices.createBookingIntoDB(payload);
  sendResponse({
    res,
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookingsFromDB();
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingServices.getSingleBookingFromDB(id);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking retrieved successfully",
    data: result,
  });
});

const updateSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const zodParsedData = bookingUpdateValidationSchema.parse(updateData); // Assuming you have a validation schema for updating bookings

  const updateResult = await bookingServices.updateBookingIntoDB(id, zodParsedData);

  if (updateResult.modifiedCount === 1) {
    // Fetch the updated booking data
    const updatedBooking = await bookingServices.getSingleBookingFromDB(id);

    sendResponse({
      res,
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } else {
    sendResponse({
      res,
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Booking not found or data not modified",
    });
  }
});

const deleteSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deleteResult = await bookingServices.deleteSingleBookingFromDB(id);

  if (deleteResult.modifiedCount === 1) {
    const deletedBooking = await bookingServices.getSingleBookingFromDB(id);

    sendResponse({
      res,
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking deleted successfully",
      data: deletedBooking,
    });
  } else {
    sendResponse({
      res,
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Booking not found",
    });
  }
});

export const bookingController = {
  createBookingController,
  getAllBookings,
  getSingleBooking,
  updateSingleBooking,
  deleteSingleBooking,
};

this is my route code
// routes.ts

import { Router } from 'express';
import { bookingController } from './booking.controller';

const router = Router();

router.post('/', bookingController.createBookingController);
router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getSingleBooking);
router.put('/:id', bookingController.updateSingleBooking);
router.delete('/:id', bookingController.deleteSingleBooking);

export const BookingRoutes = router;

