// services/payment.service.ts
import config from "../../config";
import { sslcz } from "../../config/sslcommrez.config";
import AppError from "../../errors/AppError";
import UserModel from "../User/user.model";
import { Payment } from "./payment.model";
import httpStatus from "http-status";
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";

const createPaymentIntoDB = async (payload: any) => {
  const initialPayload = {
    total_amount: payload.amount,
    currency: "BDT",
    tran_id: payload.transactionId,
    success_url: `${config.CLIENT_URL}/api/payment/success-payment`,
    fail_url: `${config.CLIENT_FAIL_URL}`,
    cancel_url: `${config.CLIENT_CANCEL_URL}`,
    ipn_url: `${config.CLIENT_URL}/api/payment/ipn-success-payment`,
    shipping_method: "Courier",
    product_name: "Car Rental",
    product_category: "Transport",
    product_profile: "general",
    cus_name: payload.name || "N/A",
    cus_email: payload.email || "N/A",
    cus_add1: payload.address?.street || "N/A",
    cus_add2: payload.address?.city || "N/A",
    cus_postcode: payload.address?.zip || "0000",
    cus_country: "Bangladesh",
    cus_phone: payload.phone || "N/A",
    cus_state: payload.address?.state || "N/A",
    cus_city: payload.address?.city || "N/A",
    cus_fax: "N/A",
    ship_name: payload.shippingAddress?.name || "N/A",
    ship_add1: payload.shippingAddress?.address || "N/A",
    ship_city: payload.shippingAddress?.city || "N/A",
    ship_postcode: payload.shippingAddress?.zipCode || "0000",
    ship_country: "Bangladesh",
  };

  const response = await sslcz.init(initialPayload);

  if (response?.GatewayPageURL) {
    await Payment.create({
      userId: payload.userId,
      orderId: payload.orderId,
      transactionId: payload.transactionId,
      amount: payload.amount,
      paymentMethod: "sslcommerz",
      status: "pending",
      currency: "BDT",
    });
    console.log("SSLCommerz response:", response.GatewayPageURL);
    return response.GatewayPageURL;
  } else {
    throw new Error("GatewayPageURL not found in SSLCommerz response");
  }
};

const paymentSuccessHandler = async (payload: any, res: any): Promise<void> => {
  const { val_id, tran_id } = payload;

  const response = await fetch(
    `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${config.SSLCOMMERZ_STORE_ID}&store_passwd=${config.SSLCOMMERZ_STORE_PASSWORD}&format=json`
  );

  if (!response.ok) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to validate payment");
  }

  const result = await response.json();

  if (result.status !== "VALID") {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment validation failed");
  }

  const payment = await Payment.findOne({ transactionId: tran_id });
  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
  }

  payment.status = "success";
  await payment.save();

  

  return res.redirect(config.CLIENT_SUCCESS_REDIRECT_URL);
};

const ipnSuccessHandler = async (payload: any) => {
  const { tran_id, status } = payload;
  const payment = await Payment.findOne({ transactionId: tran_id });
  if (!payment) throw new AppError(httpStatus.NOT_FOUND, "Payment not found");

  payment.status = status === "VALID" ? "success" : "failed";
  await payment.save();

  return payment;
};

const getAllPaymentsFromDB = async () => {
  const payments = await Payment.find().populate("orderId").populate("userId");
  return payments;
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
  paymentSuccessHandler,
  ipnSuccessHandler,
};
