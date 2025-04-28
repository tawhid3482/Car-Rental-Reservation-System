import mongoose, { Schema, model, Document } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not correct role ",
      },
      required: true,
    },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

const UserModel = mongoose.model<TUser>("User", userSchema);
export default UserModel;
