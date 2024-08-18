import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createProductValidation,
  orderProductsValidation,
  updateProductValidation,
} from './product.validation';
import { ProductControllers } from './product.controller';

export const productRouter = Router();

productRouter.post(
  '/create-product',
  validateRequest(createProductValidation),
  ProductControllers.createProduct,
);

productRouter.post(
  '/orders',
  validateRequest(orderProductsValidation),
  ProductControllers.orderProducts,
);

productRouter.get('/', ProductControllers.getAllProducts);

productRouter.get('/:id', ProductControllers.getSingleProduct);

productRouter.delete('/:id', ProductControllers.deleteProduct);

productRouter.patch(
  '/:id',
  validateRequest(updateProductValidation),
  ProductControllers.updateProduct,
);
