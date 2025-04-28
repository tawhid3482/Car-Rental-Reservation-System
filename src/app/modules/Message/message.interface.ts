import { Types } from "mongoose";

export type TMessage = {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
  isSeen: boolean;
  image:string
};