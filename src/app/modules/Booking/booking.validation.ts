import { z } from 'zod';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const createBookingValidationSchema = z.object({
  carId: z.string(), // Assuming carId is passed instead of car directly
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format"
  }),
  startTime: z.string().regex(timeRegex, "Invalid time format, expected HH:mm"),
  endTime: z.string().regex(timeRegex, "Invalid time format, expected HH:mm"),
  totalCost: z.number().optional(), // Optional as it's calculated server-side
});
