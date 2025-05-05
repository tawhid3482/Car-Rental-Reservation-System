import { model, Schema } from "mongoose";
import { IPayment } from "./payment.interface";

const PaymentSchema = new Schema<IPayment>({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'BDT'
    },
    paymentMethod: {
      type: String, // 'sslcommerz', 'stripe', 'bkash', etc.
      required: true
    },
    transactionId: {
      type: String,
      unique: true,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed', 'cancelled'],
      default: 'pending'
    },
    paymentTime: {
      type: Date,
      default: Date.now
    },
    gatewayResponse: {
      type: Object, // Full response from gateway (optional but helpful for debugging)
      default: {}
    }
  }, { timestamps: true });


  export const payment = model<IPayment>('payment', PaymentSchema)
  