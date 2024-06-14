// user.model.ts
import { Schema, model, Document } from 'mongoose';
import { TUser } from './user.interface';
import { USER_ROLE } from './user.constant';

interface TUserDocument extends TUser, Document {}

const userSchema = new Schema<TUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: Object.values(USER_ROLE), 
    required: true,
  },
  password: { type: String, required: true, select: false },
  phone: { type: String, required: true },
  address: { type: String, required: true },
}, {
  timestamps: true,
});

export const UserModel = model<TUserDocument>('User', userSchema);


