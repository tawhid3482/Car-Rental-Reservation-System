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

  const {
    paymentMethod,
    amount,
    transactionId,
    success_url,
    fail_url,
    cancel_url,
  } = req.body;
  // console.log(req.body);

  let result;
  if (paymentMethod === "sslcommerz") {
    const paymentData = {
      total_amount: amount,
      transactionId,
      success_url: `${success_url}`,
      fail_url: `${fail_url}`,
      cancel_url: `${cancel_url}`,
      cus_email: email,
      cus_name: "Customer",
      cus_add1: "",
      cus_phone: "",
    };

    result = await initiateSSLCommerzPayment(paymentData);
    console.log(result);
  }

  if (paymentMethod === "stripe") {
    const intent = await createStripePaymentIntent(amount);
    result = { clientSecret: intent.client_secret };
  }
  if (paymentMethod === "paypal") {
    result = await createPayPalPayment(amount);
    console.log(result);
  }

  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initiated",
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

const getAllPayments = catchAsync(async (req, res) => {
  const result = await PaymentServices.getAllPaymentsFromDB();
  sendResponse({
    res,
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Payment retrieved successfully",
    data: result,
  });
});

const getAllPaymentsByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  if (!email) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is not  found");
  }

  const result = await PaymentServices.getAllPaymentsByEmail(email);
  sendResponse({
    res,
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Payment retrieved successfully",
    data: result,
  });
});

const sslcommerzSuccess = catchAsync(async (req, res) => {
  const { transactionId } = req.params;

  // Optional: Save payment status in DB
  await PaymentServices.markPaymentAsPaid(transactionId);

  // Redirect user to frontend
  res.redirect(`${process.env.CLIENT_URL}/dashboard/payment-history`);
});

const sslcommerzFail = catchAsync(async (req, res) => {
  const { transactionId } = req.params;

  // Optional: Save failure status in DB
  await PaymentServices.markPaymentAsFailed(transactionId);

  res.redirect(`${process.env.CLIENT_URL}/dashboard/payment/failed`);
});

const sslcommerzCancel = catchAsync(async (req, res) => {
  const { transactionId } = req.params;

  res.redirect(`${process.env.CLIENT_URL}/dashboard/my-booking`);
});

export const PaymentControllers = {
  createPayment,
  getAllPayments,
  initiatePayment,
  getAllPaymentsByEmail,
  sslcommerzSuccess,
  sslcommerzFail,
  sslcommerzCancel,
  paymentSuccess,
};
