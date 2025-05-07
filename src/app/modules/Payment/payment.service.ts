
import { IPayment } from "./payment.interface";
import { Payment } from "./payment.model";


const createPaymentIntoDB = async (payload: IPayment) => {
  const newPayment = await Payment.create(payload);
  return newPayment;
};
;

export const PaymentServices = {
  createPaymentIntoDB,
  // getAllPaymentsFromDB,
  // getPaymentByIdFromDB,
};
