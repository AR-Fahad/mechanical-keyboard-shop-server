import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { createProductValidation } from './product.validation';
import { ProductControllers } from './product.controller';

export const productRouter = Router();

productRouter.post(
  '/create-product',
  validateRequest(createProductValidation),
  ProductControllers.createProduct,
);

productRouter.get('/', ProductControllers.getAllProducts);
