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
    user: z.string().optional(),
    car: z.string(),
    startTime: timeStringSchema,
    endTime: z.union([timeStringSchema, z.null()]).optional(), // Allow null for endTime
    totalCost: z.number().nonnegative().optional(), // Optional as it's calculated server-side
  })
});

export const validationSchema = {
createBookingValidationSchema,
}
