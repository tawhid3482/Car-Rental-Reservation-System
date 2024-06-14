import { Response } from 'express';

interface SendResponseProps {
  res: Response;
  statusCode: number;
  success: boolean;
  message: string;
  data?: any;
}

const sendResponse = ({ res, statusCode, success, message, data }: SendResponseProps) => {
  res.status(statusCode).json({
    success,
    statusCode,
    message,
    data,
  });
};

export default sendResponse;
