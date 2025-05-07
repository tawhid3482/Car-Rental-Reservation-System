import UserModel from "../User/user.model";
import { IPayment } from "./payment.interface";
import { Payment } from "./payment.model";

const createPaymentIntoDB = async (payload: IPayment) => {
  const newPayment = await Payment.create(payload);
  return newPayment;
};

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

export const PaymentServices = {
  createPaymentIntoDB,
  getAllPaymentsFromDB,
  getAllPaymentsByEmail,
};
