import { Response } from "express";
import CustomError from "utils/CustomError.class";

export const handleError: (err: CustomError, res: Response) => void = (
  err: CustomError,
  res: Response
) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
