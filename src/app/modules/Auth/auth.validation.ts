import { z } from 'zod';

const SignInValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }).email(),
    password: z.string(),
  }),
});

export const AuthValidation = {
  SignInValidationSchema,
};