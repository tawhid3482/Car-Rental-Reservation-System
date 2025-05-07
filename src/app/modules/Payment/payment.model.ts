import { model, Schema } from "mongoose";
import { IPayment } from "./payment.interface";

const PaymentSchema = new Schema<IPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "BDT",
    },
    paymentMethod: {
      type: String,
      enum: ["sslcommerz", "stripe", "paypal"],
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "cancelled"],
      default: "pending",
    },
    gatewayResponse: {
      type: Object, 
      default: {},
    },
  },
  { timestamps: true }
);

export const Payment = model<IPayment>('Payment', PaymentSchema);
