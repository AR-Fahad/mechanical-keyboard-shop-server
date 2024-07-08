import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (fs: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fs(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
