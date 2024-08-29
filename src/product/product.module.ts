import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './presentation/product.service';
import { PostgresConfigService } from '../config/postgres.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './infra/db/typeorm/entities/product.entity';
import { ProductRepository } from './infra/db/typeorm/product-repository';
import { AddProductRepositoryInterface } from './application/interfaces/add-product-repository.interface';
import { FindProductByTitleRepositoryInterface } from './application/interfaces/find-product-by-title-repository.interface';
import { AddProduct } from './application/usecases/add-product/add-product';
import { AddProductInterface } from './domain/usecases/add-product.interface';
import { GetProductsInterface } from './domain/usecases/get-products.interface';
import { GetProducts } from './application/usecases/get-products/get-products';
import { FindAllProductsRepositoryInterface } from './application/interfaces/find-all-products-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    ProductService,
    PostgresConfigService,
    {
      provide: AddProductRepositoryInterface, // Interface as the token
      useClass: ProductRepository, // Concrete class
    },
    {
      provide: FindProductByTitleRepositoryInterface,
      useClass: ProductRepository,
    },
    {
      provide: AddProductInterface,
      useClass: AddProduct,
    },
    {
      provide: GetProductsInterface,
      useClass: GetProducts,
    },
    {
      provide: FindAllProductsRepositoryInterface,
      useClass: ProductRepository,
    },
  ],
})
export class ProductModule {}
