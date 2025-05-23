import { z } from 'zod';

export const UserRoleSchema = z.enum(['admin', 'user']).optional();

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    image: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    role: UserRoleSchema,
    address: z.string(),
  }),
});
const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    role: UserRoleSchema,
    address: z.string().optional(),
  }),
});


export const validateUser = { createUserValidationSchema ,updateUserValidationSchema};