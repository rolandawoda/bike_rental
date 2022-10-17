import { NextFunction, Request, Response } from "express";

import CustomError from "./CustomError.class";

const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => void
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      next(new CustomError(error.statusCode || 500, error.message));
    });
  };
};

export default catchAsync;
