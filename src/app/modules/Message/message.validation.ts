import { z } from "zod";

const createMessageValidationSchema = z.object({
  body: z.object({
    sender: z.object({
      id: z.string({ required_error: "Sender ID is required" }),
      name: z.string({ required_error: "Sender Name is required" }),
      avatarUrl: z.string().url().optional(),
    }),
    receiver: z.object({
      id: z.string({ required_error: "Receiver ID is required" }),
      name: z.string({ required_error: "Receiver Name is required" }),
      avatarUrl: z.string().url().optional(),
    }),
    content: z.string({ required_error: "Content is required" }).min(1, "Content cannot be empty"),
    messageType: z.enum(["text", "image", "video", "file"]).default("text"),
    attachments: z.array(z.string().url()).optional(),
    isRead: z.boolean().optional(),
  }),
});

const updateMessageValidationSchema = z.object({
  body: z.object({
    content: z.string().optional(),
    messageType: z.enum(["text", "image", "video", "file"]).optional(),
    attachments: z.array(z.string().url()).optional(),
    isRead: z.boolean().optional(),
  }),
});

export const messageValidation = {
  createMessageValidationSchema,
  updateMessageValidationSchema,
};
