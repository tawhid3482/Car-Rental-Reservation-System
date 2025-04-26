import express from "express";
import validateRequest from "../../middlewares/validationRequest";
import { messageValidation } from "./message.validation";
import { messageController } from "./message.controller";



const router = express.Router();

router.post(
  "/",
  // auth("admin"),
  validateRequest(messageValidation.createMessageValidationSchema),
  messageController.createMessageController
);

router.get("/", messageController.getAllMessages);

export const messageRoute = router