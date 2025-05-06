// controllers/payment.controller.ts
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createStripePaymentIntent } from "./utils/stripe";
import { createPayPalPayment } from "./utils/paypal";
import { initiateSSLCommerzPayment } from "./utils/sslcommerz";
import { PaymentServices } from "./payment.service";

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

const getAllPayments = catchAsync(async (_req, res) => {
  const result = await PaymentServices.getAllPaymentsFromDB();
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Payments retrieved successfully",
    data: result,
  });
});

const getPaymentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PaymentServices.getPaymentByIdFromDB(id);
  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment retrieved successfully",
    data: result,
  });
});
const initiatePayment = catchAsync(async (req, res) => {
    const { paymentMethod, amount, transactionId } = req.body;
  
    let result;
  
    if (paymentMethod === "sslcommerz") {
      result = await initiateSSLCommerzPayment({
        total_amount: amount,
        transactionId,
        success_url: "http://localhost:3000/payment/success",
        fail_url: "http://localhost:3000/payment/fail",
        cancel_url: "http://localhost:3000/payment/cancel",
        cus_email: "demo@example.com",
        cus_name: "Customer",
        cus_add1: "Dhaka",
        cus_phone: "01711111111",
      });
    }
  
    if (paymentMethod === "stripe") {
      result = await createStripePaymentIntent(amount);
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
  getAllPayments,
  getPaymentById,
  initiatePayment
};
