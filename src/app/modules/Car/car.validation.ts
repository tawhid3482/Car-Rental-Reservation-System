import { z } from 'zod';

 const carValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  color: z.string().nonempty({ message: 'Color is required' }),
  isElectric: z.boolean().refine(val => typeof val === 'boolean', {
    message: 'isElectric must be a boolean',
  }),
  status: z.enum(['available', 'unavailable'], {
    required_error: 'Status is required',
  }),
  features: z.array(z.string()).nonempty({ message: 'Features must be an array of strings' }),
  pricePerHour: z.number().positive({ message: 'Price per hour must be a positive number' }),
  isDeleted: z.boolean().default(false).refine(val => typeof val === 'boolean', {
    message: 'isDeleted must be a boolean',
  }),
});
 const carUpdateValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  color: z.string().nonempty({ message: 'Color is required' }),
  isElectric: z.boolean().refine(val => typeof val === 'boolean', {
    message: 'isElectric must be a boolean',
  }),
  status: z.enum(['available', 'unavailable'], {
    required_error: 'Status is required',
  }),
  features: z.array(z.string()).nonempty({ message: 'Features must be an array of strings' }),
  pricePerHour: z.number().positive({ message: 'Price per hour must be a positive number' }),
  isDeleted: z.boolean().default(false).refine(val => typeof val === 'boolean', {
    message: 'isDeleted must be a boolean',
  }),
});


export const carValidation = {
  carValidationSchema,
  carUpdateValidationSchema
}

