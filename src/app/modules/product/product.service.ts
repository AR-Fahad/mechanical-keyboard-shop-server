import { QueryBuilder } from '../../builders/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (query: Record<string, unknown>) => {
  const products = new QueryBuilder(Product.find(), query)
    .search(['name', 'brand'])
    .priceRange()
    .sort()
    .paginate();
  const result = await products.modelQuery;
  return result;
};

const getSingleProduct = async (productId: string) => {
  const result = await Product.findById(productId);
  if (!result) {
    throw new AppError(404, '_id', 'Product is not found');
  }
  return result;
};

const deleteProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  if (!result) {
    throw new AppError(404, '_id', 'Product is not found');
  }
  return result;
};

const updateProduct = async (productId: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(404, '_id', 'Product is not found');
  }
  return result;
};

const orderProducts = async (orders: { _id: string; quantity: number }[]) => {
  const isProductsExists = await Product.find({
    _id: { $in: orders.map((order) => order._id) },
  });

  if (isProductsExists.length !== orders.length) {
    throw new AppError(404, '_id', 'One or more products not found');
  }

  const isAvailable = await Product.find({
    $or: orders.map((order) => ({
      _id: order._id,
      quantity: { $gte: order.quantity },
    })),
  });
  if (isAvailable.length !== orders.length) {
    throw new AppError(400, 'quantity', 'Insufficient quantity');
  }

  for (const order of orders) {
    const product = await Product.findById(order._id);
    const quantity = product!.quantity - order.quantity;
    await Product.findByIdAndUpdate(order._id, {
      quantity,
    });
  }
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  orderProducts,
};
