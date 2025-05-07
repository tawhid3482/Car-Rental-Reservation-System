import { z } from "zod";

export const createPaymentZodSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required"),
    orderId: z.string().min(1, "Order ID is required"),
    amount: z.number().min(1, "Amount must be greater than 0"),
    currency: z.string().optional().default("BDT"),
    paymentMethod: z.enum(["sslcommerz", "stripe", "paypal"]),
    transactionId: z.string().min(1, "Transaction ID is required"),
    status: z
      .enum(["pending", "success", "failed", "cancelled"])
      .optional()
      .default("pending"),
    gatewayResponse: z.record(z.any()).optional(),
  }),
});

export const paymentValidation = {
  createPaymentZodSchema,
};
