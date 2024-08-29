import { ProductModel } from '../models/product-model';

export interface GetProductsInterface {
  getAll: () => Promise<ProductModel[]>;
}

export const GetProductsInterface = Symbol('GetProductsInterface');
