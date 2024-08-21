import {
  AddProductModel,
  ProductModel,
} from 'src/product/domain/models/product-model';

export interface AddProductRepositoryInterface {
  save: (product: AddProductModel) => Promise<ProductModel>;
}

export const AddProductRepositoryInterface = Symbol(
  'AddProductRepositoryInterface',
);
