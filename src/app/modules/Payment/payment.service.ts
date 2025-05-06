// services/payment.service.ts

import { IPayment } from "./payment.interface";
import { payment } from "./payment.model";


const createPaymentIntoDB = async (payload: IPayment) => {
  const newPayment = await payment.create(payload);
  return newPayment;
};

const getAllPaymentsFromDB = async () => {
  const payments = await payment
    .find()
    .populate("userId", "-password")
    .populate("orderId");
  return payments;
};

const getPaymentByIdFromDB = async (id: string) => {
  const foundPayment = await payment
    .findById(id)
    .populate("userId", "-password")
    .populate("orderId");
  return foundPayment;
};

export const PaymentServices = {
  createPaymentIntoDB,
  getAllPaymentsFromDB,
  getPaymentByIdFromDB,
};
