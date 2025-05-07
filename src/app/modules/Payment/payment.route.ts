// routes/payment.route.ts
import express from "express";
import validateRequest from "../../middlewares/validationRequest";
import { paymentValidation } from "./payment.validation";
import { PaymentControllers } from "./payment.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth("user"),
  validateRequest(paymentValidation.createPaymentZodSchema),
  PaymentControllers.createPayment
);
router.post("/initiate", auth("user"), PaymentControllers.initiatePayment);

router.get("/", 
  // auth("user",'admin'),
   PaymentControllers.getAllPayments);
   
router.get("/:email", auth("user"), PaymentControllers.getAllPaymentsByEmail);

export const PaymentRoutes = router;
