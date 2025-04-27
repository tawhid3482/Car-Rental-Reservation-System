import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MessageService } from "./message.service";
import httpStatus from "http-status";

const sendMessage = catchAsync(async (req, res) => {
  const { receiver, content } = req.body;
  const senderId = req.user._id;

  const result = await MessageService.sendMessage(senderId, receiver, content);

  sendResponse({
    res,
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});

const getMessages = catchAsync(async (req, res) => {
  const { otherUserId } = req.params;
  const userId = req.user._id;
  const messages = await MessageService.getMessages(userId, otherUserId);

  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Messages retrieved successfully",
    data: messages,
  });
});

const markAsSeen = catchAsync(async (req, res) => {
  const { senderId } = req.body;
  const receiverId = req.user._id;

  await MessageService.markMessagesAsSeen(senderId, receiverId);

  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Messages marked as seen",
  });
});

// ✅ New: deleteMessage function
const deleteMessage = catchAsync(async (req, res) => {
  const { messageId } = req.params;
  const userId = req.user._id;

  const result = await MessageService.deleteMessage(userId, messageId);

  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Message deleted successfully",
    data: result,
  });
});

const getAllConversations = catchAsync(async (req, res) => {
  const adminId = req.user._id;

  const conversations = await MessageService.getAllConversations(adminId);

  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Conversations retrieved successfully",
    data: conversations,
  });
});


export const MessageController = {
  sendMessage,
  getMessages,
  markAsSeen,
  deleteMessage, // ✅ Exporting deleteMessage
  getAllConversations
};
