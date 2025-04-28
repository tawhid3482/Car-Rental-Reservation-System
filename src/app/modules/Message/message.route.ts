// message.route.ts
import express from "express";
import { MessageController } from "./message.controller";
import validateRequest from "../../middlewares/validationRequest";
import { messageValidation } from "./message.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth('admin','user'),
  validateRequest(messageValidation.createMessageValidationSchema),
  MessageController.sendMessage
);
router.get("/conversations", auth('admin','user'), MessageController.getAllConversations);

router.get("/:otherUserId", auth('admin','user'),  MessageController.getMessages);




router.patch(
  "/seen",
  validateRequest(messageValidation.updateMessageValidationSchema),
  MessageController.markAsSeen
);

// ✅ Delete Route
router.delete("/:messageId", MessageController.deleteMessage);

export const MessageRoutes = router;
