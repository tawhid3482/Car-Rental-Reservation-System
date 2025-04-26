import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { messageService } from "./message.service";

const createMessageController = catchAsync(async (req, res) => {
  const result = await messageService.createMessageIntoDB(req.body);

  sendResponse({
    res,
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message sent successfully!",
    data: result,
  });
});

const getAllMessages = catchAsync(async (req, res) => {
  const result = await messageService.getAllMessagesFromDB();

  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Messages retrieved successfully!",
    data: result,
  });
});

const getSingleMessage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await messageService.getSingleMessageFromDB(id);

  sendResponse({
    res,
    statusCode: httpStatus.OK,
    success: true,
    message: "Single message retrieved successfully!",
    data: result,
  });
});

const updateSingleMessage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const updateResult = await messageService.updateMessageIntoDB(id, updateData);

  if (updateResult.modifiedCount === 1) {
    const updatedMessage = await messageService.getSingleMessageFromDB(id);

    sendResponse({
      res,
      statusCode: httpStatus.OK,
      success: true,
      message: "Message updated successfully!",
      data: updatedMessage,
    });
  } else {
    sendResponse({
      res,
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Message not found or data not modified",
    });
  }
});

const deleteSingleMessage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deleteResult = await messageService.deleteMessageFromDB(id);

  if (deleteResult.deletedCount === 1) {
    sendResponse({
      res,
      statusCode: httpStatus.OK,
      success: true,
      message: "Message deleted successfully!",
    });
  } else {
    sendResponse({
      res,
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Message not found",
    });
  }
});

export const messageController = {
  createMessageController,
  getAllMessages,
  getSingleMessage,
  updateSingleMessage,
  deleteSingleMessage,
};
