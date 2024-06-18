import { z } from 'zod';

const createBookingValidation = z.object({
  body: z.object({
    date: z.string(),
    user: z.string(),  // Expecting user and car as strings
    car: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    totalCost: z.number().optional(),  // Optional as it's calculated server-side
  }),
});

export const validateBooking = { createBookingValidation };
