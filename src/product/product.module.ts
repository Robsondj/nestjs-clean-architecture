import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './presentation/product.service';
import { PostgresConfigService } from 'src/config/postgres.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './infra/db/typeorm/entities/product.entity';
import { ProductRepository } from './infra/db/typeorm/product-repository';
import { AddProductRepositoryInterface } from './application/interfaces/add-product-repository-interface';
import { FindProductByTitleRepositoryInterface } from './application/interfaces/find-product-by-title-repository-interface';
import { DbAddProduct } from './application/usecases/db-add-product';
import { AddProduct } from './domain/usecases/add-product';

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
      provide: AddProduct,
      useClass: DbAddProduct,
    },
  ],
})
export class ProductModule {}
