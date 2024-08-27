import { AddProductModel, ProductModel } from '../models/product-model';

export interface AddProductInterface {
  add: (product: AddProductModel) => Promise<ProductModel | null>;
}

export const AddProductInterface = Symbol('AddProductInterface');
