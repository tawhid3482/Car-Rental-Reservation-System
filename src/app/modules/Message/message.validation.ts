// message.validation.ts
import { z } from "zod";

// Create Message Validation
const createMessageValidationSchema = z.object({
  body: z.object({
    sender: z.string({
      required_error: "Sender ID is required",
    }),
    receiver: z.string({
      required_error: "Receiver ID is required",
    }),
    content: z.string({
      required_error: "Content is required",
    }),
    image: z.string({
      required_error: "Content is required",
    }),
    isSeen: z.boolean().optional(), // optional, because default model এ false দেওয়া
  }),
});

// Update Message Validation (only isSeen update)
const updateMessageValidationSchema = z.object({
  body: z.object({
    isSeen: z.boolean({
      required_error: "Seen status is required",
    }),
  }),
});

// Mark Messages as Seen (senderId will come in body to mark)
const markMessagesAsSeenValidationSchema = z.object({
  body: z.object({
    sender: z.string({
      required_error: "Sender ID is required to mark messages as seen",
    }),
  }),
});

// Delete Message Validation (if needed for middleware validation in future)
const deleteMessageValidationSchema = z.object({
  params: z.object({
    messageId: z.string({
      required_error: "Message ID is required for deletion",
    }),
  }),
});

export const messageValidation = {
  createMessageValidationSchema,
  updateMessageValidationSchema,
  markMessagesAsSeenValidationSchema,
  deleteMessageValidationSchema,
};
