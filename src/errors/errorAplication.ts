import { NextFunction, Request, Response } from "express";

class ErrorHandler extends Error {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode || 500;
    this.message = message;
  }
}

const handleError = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    error: {
      status: "error",
      statusCode,
      message,
    },
  });
};

export { ErrorHandler, handleError };
