import { Router } from 'express';
import { productRouter } from '../modules/product/product.routes';

export const router = Router();

const moduleRoutes = [
  {
    path: '/products',
    router: productRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));
