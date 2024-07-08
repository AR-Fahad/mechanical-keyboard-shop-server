import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { ProductServices } from './product.service';
import sendResponse from '../../utils/sendResponse';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.createProduct(req?.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProducts(req?.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Products retrieved successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
};
