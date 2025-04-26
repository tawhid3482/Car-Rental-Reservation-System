import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";

const carSchema = new Schema<TCar>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: [String], required: true },
    sit: { type: Number, required: true },
    door: { type: Number, required: true },
    bag: { type: Number, required: true },
    love: { type: Number, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
export const CarModel = model<TCar>("Car", carSchema);
