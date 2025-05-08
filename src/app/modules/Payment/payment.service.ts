import config from "../../config";
import AppError from "../../errors/AppError";
import { Booking } from "../Booking/booking.model";
import UserModel from "../User/user.model";
import { IPayment } from "./payment.interface";
import { Payment } from "./payment.model";
import httpStatus from "http-status";

const createPaymentIntoDB = async (payload: IPayment) => {
  const newPayment = await Payment.create(payload);
  return newPayment;
};

// const paymentSuccessHandler = async (payload: any, res: any): Promise<void> => {
//   const { val_id, tran_id } = payload;

//   // Validate payment from SSLCommerz
//   const response = await fetch(
//     `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${config.SSLCOMMERZ_STORE_ID}&store_passwd=${config.SSLCOMMERZ_STORE_PASSWORD}&format=json`
//   );

//   if (!response.ok) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Failed to validate payment");
//   }

//   const result = await response.json();

//   if (result.status !== "VALID") {
//     throw new AppError(httpStatus.BAD_REQUEST, "Payment validation failed");
//   }

//   // Update payment status in database
//   const payment = await Payment.findOne({ transactionId: tran_id });
//   if (!payment) {
//     throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
//   }

//   payment.status = "success";
//   await payment.save();

//   // 3. Delete user's cart after successful payment
//   const userId = payment.user;
//   const orderStatusUpdate = await Booking.findOne({ user: userId });
//   return res.redirect("http://localhost:5173");
// };

const getAllPaymentsFromDB = async () => {
  const newPayment = await Payment.find()
    .populate("orderId")
    .populate("userId");
  return newPayment;
};

const getAllPaymentsByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) return [];

  const payments = await Payment.find({ userId: user._id })
    .populate("orderId")
    .populate("userId");
  return payments;
};

const markPaymentAsPaid = async (transactionId: string) => {
  return await Payment.updateOne({ transactionId }, { status: "paid" });
};

const markPaymentAsFailed = async (transactionId: string) => {
  return await Payment.updateOne({ transactionId }, { status: "failed" });
};

export const PaymentServices = {
  createPaymentIntoDB,
  getAllPaymentsFromDB,
  getAllPaymentsByEmail,
  markPaymentAsPaid,
  markPaymentAsFailed,
  // paymentSuccessHandler,
};
