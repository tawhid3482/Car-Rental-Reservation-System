import { z } from "zod";
import { Types } from "mongoose";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  }
);

export const createBookingValidationSchema = z.object({
  body: z.object({
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
    user: z.string(),
    carId: z.string(),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
    totalCost: z.number().nonnegative().optional(), // Optional as it's calculated server-side
  }).refine(
    (body) => {
      const start = new Date(`1970-01-01T${body.startTime}:00`);
      const end = new Date(`1970-01-01T${body.endTime}:00`);

      return end > start;
    },
    {
      message: 'Start time should be before End time ! ',
    },
  ),
});

export const validationSchema = {
createBookingValidationSchema
}