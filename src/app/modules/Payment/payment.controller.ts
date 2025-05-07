import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createStripePaymentIntent } from "./utils/stripe";
import { createPayPalPayment } from "./utils/paypal";
import { initiateSSLCommerzPayment } from "./utils/sslcommerz";
import { PaymentServices } from "./payment.service";
import AppError from "../../errors/AppError";

const createPayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.createPaymentIntoDB(req.body);
  sendResponse({
    res,
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Payment created successfully",
    data: result,
  });
});

const initiatePayment = catchAsync(async (req, res) => {
  const { email } = req.user;
  if (!email) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized user");
  }

  const { paymentMethod, amount, transactionId } = req.body;

  let result;

  if (paymentMethod === "sslcommerz") {
    result = await initiateSSLCommerzPayment({
      total_amount: amount,
      transactionId,
      success_url: "http://localhost:3000/payment/success",
      fail_url: "http://localhost:3000/payment/fail",
      cancel_url: "http://localhost:3000/payment/cancel",
      cus_email: email,
      cus_name: "Customer",
      cus_add1: "Dhaka",
      cus_phone: "01711111111",
    });
  }

  if (paymentMethod === "stripe") {
    const intent = await createStripePaymentIntent(amount);
    result = { clientSecret: intent.client_secret };
  }

  if (paymentMethod === "paypal") {
    result = await createPayPalPayment(amount);
  }

  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initiated",
    data: result,
  });
});

export const PaymentControllers = {
  createPayment,
  // getAllPayments,
  // getPaymentById,
  initiatePayment,
};
