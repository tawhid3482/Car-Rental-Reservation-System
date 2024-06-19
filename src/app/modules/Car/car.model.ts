import { Schema, model, Document } from "mongoose";
import { TCar } from "./car.interface";

interface TCarDocument extends TCar, Document {}

const carSchema = new Schema<TCarDocument>(
  {
    name: { type: String, required: true },
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
export const CarModel = model<TCarDocument>('Car', carSchema);