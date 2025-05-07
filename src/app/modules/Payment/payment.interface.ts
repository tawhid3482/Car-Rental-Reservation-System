import { Types } from "mongoose";

export type TPaymentStatus = 'pending' | 'success' | 'failed' | 'cancelled';

export interface IGatewayResponse {
  [key: string]: any; // Can be made more specific if needed
}

export interface IPayment {
  userId: Types.ObjectId; // ObjectId as string
  orderId: Types.ObjectId; // ObjectId as string
  amount: number;
  currency?: string; // default: 'BDT'
  paymentMethod: 'sslcommerz' | 'stripe' | 'paypal' ;
  transactionId: string;
  status?: TPaymentStatus; // default: 'pending'
  gatewayResponse?: IGatewayResponse;
}
