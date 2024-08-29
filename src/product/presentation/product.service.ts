import { Inject, Injectable, Logger } from '@nestjs/common';
import { AddProductInterface } from '../domain/usecases/add-product.interface';
import { AddProductDTO } from '../dto/AddProduct.dto';
import { ResponseDto } from '../../dto/Response.dto';
import { AddProductModel, ProductModel } from '../domain/models/product-model';
import { GetProductsInterface } from '../domain/usecases/get-products.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject(AddProductInterface)
    private readonly addProduct: AddProductInterface,
    @Inject(GetProductsInterface)
    private readonly getProducts: GetProductsInterface,
    private readonly logger = new Logger(ProductService.name),
  ) {}

  async add(
    product: AddProductDTO,
  ): Promise<ResponseDto<ProductModel | undefined>> {
    try {
      if (product.price <= 0) {
        return ResponseDto.badRequest('Invalid product price.');
      }
      const result = await this.addProduct.add(
        product as any as AddProductModel,
      );
      if (result?.id) {
        return ResponseDto.successRequest<ProductModel>(result);
      }
      return ResponseDto.forbidden('Product already exists.');
    } catch (err) {
      this.logger.error(err);
      return ResponseDto.serverError(err.message);
    }
  }

  async getAll(): Promise<ResponseDto<ProductModel[]>> {
    try {
      return ResponseDto.successRequest(await this.getProducts.getAll());
    } catch (err) {
      this.logger.error(err);
      return ResponseDto.serverError(err.message);
    }
  }
}
