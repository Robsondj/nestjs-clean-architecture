import { Inject, Injectable } from '@nestjs/common';
import { AddProduct } from '../../domain/usecases/add-product';
import { AddProductRepositoryInterface } from '../interfaces/add-product-repository-interface';
import { FindProductByTitleRepositoryInterface } from '../interfaces/find-product-by-title-repository-interface';
import {
  AddProductModel,
  ProductModel,
} from 'src/product/domain/models/product-model';

@Injectable()
export class DbAddProduct implements AddProduct {
  constructor(
    @Inject(AddProductRepositoryInterface)
    private readonly addRepository: AddProductRepositoryInterface,
    @Inject(FindProductByTitleRepositoryInterface)
    private readonly findByTitlerepository: FindProductByTitleRepositoryInterface,
  ) {}

  async add(product: AddProductModel): Promise<ProductModel | null> {
    const dbProduct = await this.findByTitlerepository.findByTitle(
      product.title,
    );
    if (dbProduct.length) {
      return null;
    }
    return await this.addRepository.save(product);
  }
}
