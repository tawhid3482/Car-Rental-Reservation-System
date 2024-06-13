import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Note that the correct option is 'false' instead of '0'
  },
  phone: { type: String, required: true },
  address: { type: String, required: true },
}, {
  timestamps: true // This adds createdAt and updatedAt timestamps
});

// Export the model
export const UserModel = model<TUser>('User', userSchema);
