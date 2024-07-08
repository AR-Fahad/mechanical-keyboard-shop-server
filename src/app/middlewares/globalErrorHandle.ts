/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { TErrorSources } from '../interfaces/error';
import { ZodError } from 'zod';
import { handleDuplicateError } from '../errors/handleDuplicateError';
import { handleCastError } from '../errors/handleCastError';
import { handleValidationError } from '../errors/handleValidationError';
import { handleZodError } from '../errors/handleZodError';

export const globalErrorHandle = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let message: string = 'Custom Error';

  let statusCode: number = error?.statusCode || error?.status || 500;

  let errorSources: TErrorSources = [
    {
      path: error?.path || '',
      message: error?.message || 'Something went wrong!',
    },
  ];

  if (error instanceof ZodError) {
    const err = handleZodError(error);
    statusCode = err.statusCode;
    message = err.message;
    errorSources = err.errorMessages as TErrorSources;
  } else if (error?.errorResponse?.code === 11000 || error?.code === 11000) {
    const err = handleDuplicateError(error);
    statusCode = err.statusCode;
    message = err.message;
    errorSources = err.errorMessages as TErrorSources;
  } else if (error?.name === 'CastError') {
    const err = handleCastError(error);
    statusCode = err.statusCode;
    message = err.message;
    errorSources = err.errorMessages as TErrorSources;
  } else if (error?.name === 'ValidationError') {
    const err = handleValidationError(error);
    statusCode = err.statusCode;
    message = err.message;
    errorSources = err.errorMessages as TErrorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: error?.stack,
  });
};
