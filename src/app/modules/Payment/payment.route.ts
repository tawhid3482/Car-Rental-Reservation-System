// routes/payment.route.ts
import express from "express";
import validateRequest from "../../middlewares/validationRequest";
import { paymentValidation } from "./payment.validation";
import { PaymentControllers } from "./payment.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(paymentValidation.createPaymentZodSchema),
  PaymentControllers.createPayment
);
router.post("/initiate", PaymentControllers.initiatePayment);


router.get("/", PaymentControllers.getAllPayments);
router.get("/:id", PaymentControllers.getPaymentById);

export const PaymentRoutes = router;
