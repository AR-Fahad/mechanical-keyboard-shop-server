import { QueryBuilder } from '../../builders/QueryBuilder';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (query: Record<string, unknown>) => {
  const products = new QueryBuilder(Product.find(), query)
    .search(['name', 'brand'])
    .sort()
    .paginate();
  const result = await products.modelQuery;
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
};
