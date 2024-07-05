import mongoose, { Schema, model, Document } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE } from "./user.constant";
import bcrypt from 'bcrypt';
import config from "../../config";


const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: {
        values:['user','admin'],
        message:'{VALUE} is not correct role '
      },
      required: true,
    },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});


// userSchema.statics.isUserExistsByCustomId = async function (id: string) {
//   return await User.findOne({ id }).select('+password');
// };

// userSchema.statics.isPasswordMatched = async function (
//   plainTextPassword,
//   hashedPassword,
// ) {
//   return await bcrypt.compare(plainTextPassword, hashedPassword);
// };

// userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
//   passwordChangedTimestamp: Date,
//   jwtIssuedTimestamp: number,
// ) {
//   const passwordChangedTime =
//     new Date(passwordChangedTimestamp).getTime() / 1000;
//   return passwordChangedTime > jwtIssuedTimestamp;
// };



const UserModel = mongoose.model<TUser>('User', userSchema);
export default UserModel
