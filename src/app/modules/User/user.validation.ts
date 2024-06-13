import { z } from 'zod';

// Define the Zod schema for TUser
const userValidationSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(["user", "admin"]),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  phone: z.string().nonempty({ message: "Phone number is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
});

// // Define the type using the Zod schema
// type TUser = z.infer<typeof userValidationSchema>;

// Export the schema and the type
export const UserValidation = {
    userValidationSchema,
  };
