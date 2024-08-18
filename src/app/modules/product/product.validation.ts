import { z } from 'zod';

export const createProductValidation = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.number(),
  quantity: z
    .number()
    .refine((value) => value > 0, { message: 'Quantity must greater than 0' }),
  description: z.string(),
  rating: z.number(),
  image: z.string().url(),
});

export const updateProductValidation = z.object({
  name: z.string().optional(),
  brand: z.string().optional(),
  price: z.number().optional(),
  quantity: z
    .number()
    .refine((value) => value > 0, { message: 'Quantity must greater than 0' })
    .optional(),

  description: z.string().optional(),
  rating: z.number().optional(),
  image: z.string().url().optional(),
});

export const orderProductsValidation = z.object({
  orders: z.array(
    z.object({
      _id: z.string(),
      quantity: z.number(),
    }),
  ),
});
