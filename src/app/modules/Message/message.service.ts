import httpStatus from "http-status";

import { Message } from "./message.model"; 
import AppError from "../../errors/AppError";

const sendMessage = async (sender: string, receiver: string, content: string, image:string) => {
  const newMessage = await Message.create({ sender: sender, receiver: receiver, content,image });
  return newMessage;
};

const getMessages = async (userId: string, otherUserId: string) => {
  const messages = await Message.find({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId },
    ],
  }).sort({ createdAt: 1 });
  return messages;
};

const markMessagesAsSeen = async (senderId: string, receiverId: string) => {
  await Message.updateMany(
    { sender: senderId, receiver: receiverId, isSeen: false },
    { isSeen: true }
  );
};

const deleteMessage = async (userId: string, messageId: string) => {
  const message = await Message.findById(messageId);
  if (!message) {
    throw new AppError(httpStatus.NOT_FOUND, "Message not found");
  }

  if (message.sender.toString() !== userId.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, "You can only delete your own messages");
  }

  const deletedMessage = await Message.findByIdAndDelete(messageId);
  return deletedMessage;
};

const getAllConversations = async (adminId: string) => {
  // Find all messages where admin is sender or receiver
  const messages = await Message.find({
    $or: [{ sender: adminId }, { receiver: adminId }],
  })
    .sort({ createdAt: -1 })
    .populate<{ sender: { _id: string; name: string; email: string; role:string; image:string }, receiver: { _id: string; name: string; email: string; role:string; image:string } }>("sender", "name email role")
    .populate("receiver", "name email role");

  const conversations = messages.map((msg) => {
    const otherUser = msg.sender._id.toString() === adminId
      ? msg.receiver
      : msg.sender;

    return {
      user: {
        _id: otherUser._id,
        name: otherUser.name,
        email: otherUser.email,
      },
      lastMessage: msg,
      unreadCount:
        msg.receiver._id.toString() === adminId && !msg.isSeen ? 1 : 0,
    };
  });

  return conversations;
};



export const MessageService = {
  sendMessage,
  getMessages,
  markMessagesAsSeen,
  deleteMessage, // ✅ Export delete
  getAllConversations
};
