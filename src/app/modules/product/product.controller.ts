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

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProduct(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProduct(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product deleted successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.updateProduct(id, req?.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product updated successfully',
    data: result,
  });
});

const orderProducts = catchAsync(async (req: Request, res: Response) => {
  const { orders } = req.body;
  await ProductServices.orderProducts(orders);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Products ordered successfully',
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  orderProducts,
};
