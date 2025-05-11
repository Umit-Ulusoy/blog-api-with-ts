import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import AppError from '@exceptions/AppError';
import { env } from '@config/env';

type CustomError = Error | AppError | ZodError;

const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors = null;

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errors = Object.fromEntries(
      Object.entries(err.flatten().fieldErrors).map(([field, errorMessages]) => [
        field,
        errorMessages?.filter(Boolean) ?? [],
      ])
    );
  }

  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  else {
    console.error('[Unhandled Error]', err);
  }

  const errorResponse: any = {
    status: false,
    message,
  };

  if (errors) {
    errorResponse.errors = errors;
  }

  if (env.APP_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode)
  .json(errorResponse);
};

export default errorHandler;
