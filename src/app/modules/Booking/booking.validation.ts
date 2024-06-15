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
