import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddProductRepositoryInterface } from 'src/product/application/interfaces/add-product-repository-interface';
import { FindProductByTitleRepositoryInterface } from 'src/product/application/interfaces/find-product-by-title-repository-interface';
import {
  AddProductModel,
  ProductModel,
} from 'src/product/domain/models/product-model';
import { ProductEntity } from 'src/product/infra/db/typeorm/entities/product.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class ProductRepository
  implements
    AddProductRepositoryInterface,
    FindProductByTitleRepositoryInterface
{
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}
  async save(product: AddProductModel): Promise<ProductModel> {
    const savedProduct = await this.repository.save(product);
    return savedProduct as any as ProductModel;
  }

  async findByTitle(title: string): Promise<ProductModel[]> {
    return (await this.repository.find({
      where: { title: Equal(title) },
    })) as any as ProductModel[];
  }
}
