import { Schema, model, Types } from "mongoose";
import { TMessage } from "./message.interface";



const messageSchema = new Schema<TMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    isSeen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Message = model<TMessage>("Message", messageSchema);
