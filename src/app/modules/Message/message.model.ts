import { model, Schema } from "mongoose";
import { TMessage } from "./Message.interface";

const messageSchema = new Schema<TMessage>(
  {
    sender: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      avatarUrl: { type: String },
    },
    receiver: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      avatarUrl: { type: String },
    },
    content: { type: String, required: true },
    messageType: {
      type: String,
      enum: ["text", "image", "video", "file"],
      default: "text",
    },
    attachments: {
      type: [String],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt এবং updatedAt অটোমেটিক তৈরি হবে
  }
);

export const Message = model<TMessage>("Message", messageSchema);
