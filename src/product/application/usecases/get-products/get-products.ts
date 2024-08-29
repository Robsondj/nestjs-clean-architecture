import { ProductModel } from 'src/product/domain/models/product-model';
import { GetProductsInterface } from 'src/product/domain/usecases/get-products.interface';
import { FindAllProductsRepositoryInterface } from '../../interfaces/find-all-products-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetProducts implements GetProductsInterface {
  constructor(
    @Inject(FindAllProductsRepositoryInterface)
    private readonly findAllProductsRepository: FindAllProductsRepositoryInterface,
  ) {}
  async getAll(): Promise<ProductModel[]> {
    return await this.findAllProductsRepository.findAll();
  }
}
