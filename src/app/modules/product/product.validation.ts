import { z } from 'zod';

export const createProductValidation = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.number(),
  quantity: z.number(),
  description: z.string(),
  rating: z.number(),
  image: z.string().url(),
});

export const updateProductValidation = z.object({
  name: z.string().optional(),
  brand: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  description: z.string().optional(),
  rating: z.number().optional(),
  image: z.string().url().optional(),
});
