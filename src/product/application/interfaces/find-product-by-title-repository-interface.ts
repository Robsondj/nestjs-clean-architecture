import { ProductModel } from 'src/product/domain/models/product-model';

export interface FindProductByTitleRepositoryInterface {
  findByTitle: (title: string) => Promise<ProductModel[]>;
}

export const FindProductByTitleRepositoryInterface = Symbol(
  'FindProductByTitleRepositoryInterface',
);
