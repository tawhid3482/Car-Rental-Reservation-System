import { z } from 'zod';
import { USER_ROLE } from './user.constant';

export const userValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.enum(Object.values(USER_ROLE) as [string, ...string[]]),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  phone: z.string().nonempty({ message: 'Phone number is required' }),
  address: z.string().nonempty({ message: 'Address is required' }),
});

export const signInValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});
