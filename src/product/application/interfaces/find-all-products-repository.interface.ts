import { ProductModel } from 'src/product/domain/models/product-model';

export interface FindAllProductsRepositoryInterface {
  findAll: () => Promise<ProductModel[]>;
}

export const FindAllProductsRepositoryInterface = Symbol(
  'FindAllProductsRepositoryInterface',
);
