import { z } from 'zod';

// Define the booking validation schema
const bookingValidationSchema = z.object({
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format"
  }),
  user: z.string().nonempty({ message: "User ID is required" }),
  car: z.string().nonempty({ message: "Car ID is required" }),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid start time format. Use HH:mm"
  }),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid end time format. Use HH:mm"
  }),
  totalCost: z.number().min(0, { message: "Total cost must be at least 0" })
});

// Function to validate booking data
const validateBooking = (bookingData: any) => {
  return bookingValidationSchema.safeParse(bookingData);
};

export { bookingValidationSchema, validateBooking };
