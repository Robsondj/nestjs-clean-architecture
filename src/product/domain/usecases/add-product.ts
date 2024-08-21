import { AddProductModel, ProductModel } from '../models/product-model';

export interface AddProduct {
  add: (product: AddProductModel) => Promise<ProductModel | null>;
}

export const AddProduct = Symbol('AddProduct');
