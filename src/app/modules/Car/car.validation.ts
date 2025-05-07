import { z } from "zod";

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    image: z.array(z.string()),
    type: z.string(),
    sit: z.number(),
    bag: z.number(),
    door: z.number(),
    love: z.number(),
    description: z.string(),
    color: z.string(),
    isElectric: z.boolean(),
    features: z.array(z.string()),
    pricePerHour: z.number().positive(),
  }),
});
const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.array(z.string()).optional(),
    type: z.string().optional(),
    sit: z.number().optional(),
    bag: z.number().optional(),
    door: z.number().optional(),
    love: z.number().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z.number().positive().optional(),
  }),
});
const updateCarLoveValidationSchema = z.object({
  body: z.object({
    love: z.number().optional(),
  }),
});

const returnCarValidationSchema = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: z.string(),
  }),
});

export const carValidation = {
  createCarValidationSchema,
  updateCarValidationSchema,
  returnCarValidationSchema,
  updateCarLoveValidationSchema,
};
