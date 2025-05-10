// controllers/payment.controller.ts
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";
import AppError from "../../errors/AppError";
import { createStripePaymentIntent } from "./utils/stripe";
import { createPayPalPayment } from "./utils/paypal";

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

const paymentSuccess = catchAsync(async (req, res) => {
  const result = await PaymentServices.paymentSuccessHandler(req.body, res);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment successful",
    data: result,
  });
});

const ipnSuccessHandler = catchAsync(async (req, res) => {
  const result = await PaymentServices.ipnSuccessHandler(req.body);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "IPN payment update received",
    data: result,
  });
});

const initiatePayment = catchAsync(async (req, res) => {
  const { email } = req.user;
  if (!email) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized user");
  }

  const {
    paymentMethod,
    amount,
    transactionId,
    success_url,
    fail_url,
    cancel_url,
  } = req.body;

  let result;

  if (paymentMethod === "stripe") {
    const intent = await createStripePaymentIntent(amount);
    result = { clientSecret: intent.client_secret };
  } else if (paymentMethod === "paypal") {
    result = await createPayPalPayment(amount);
  } else if (paymentMethod === "sslcommerz") {
    result = await PaymentServices.createPaymentIntoDB({
      ...req.body,
      email,
    });
  }

  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initiated",
    data: result,
  });
});

const getAllPayments = catchAsync(async (req, res) => {
  const result = await PaymentServices.getAllPaymentsFromDB();
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Payments retrieved successfully",
    data: result,
  });
});

const getAllPaymentsByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  if (!email) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  const result = await PaymentServices.getAllPaymentsByEmail(email);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Payments retrieved successfully",
    data: result,
  });
});

export const PaymentControllers = {
  createPayment,
  getAllPayments,
  initiatePayment,
  getAllPaymentsByEmail,
  paymentSuccess,
  ipnSuccessHandler,
};
