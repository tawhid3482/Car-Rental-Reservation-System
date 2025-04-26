import { TMessage } from "./Message.interface";
import { Message } from "./message.model";

const createMessageIntoDB = async (payload: TMessage) => {
  const result = await Message.create(payload);
  return result;
};

const getAllMessagesFromDB = async () => {
  const result = await Message.find().sort({ createdAt: -1 });
  return result;
};

const getSingleMessageFromDB = async (id: string) => {
  const result = await Message.findById(id);
  return result;
};

const updateMessageIntoDB = async (id: string, updateData: Partial<TMessage>) => {
  const result = await Message.updateOne({ _id: id }, { $set: updateData });
  return result;
};

const deleteMessageFromDB = async (id: string) => {
  const result = await Message.deleteOne({ _id: id });
  return result;
};

export const messageService = {
  createMessageIntoDB,
  getAllMessagesFromDB,
  getSingleMessageFromDB,
  updateMessageIntoDB,
  deleteMessageFromDB,
};
