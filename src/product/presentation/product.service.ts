import { Inject, Injectable, Res } from '@nestjs/common';
import { AddProductInterface } from '../domain/usecases/add-product.interface';
import { AddProductDTO } from '../dto/AddProduct.dto';
import { ResponseDto } from '../../dto/Response.dto';
import { AddProductModel, ProductModel } from '../domain/models/product-model';

@Injectable()
export class ProductService {
  constructor(
    @Inject(AddProductInterface)
    private readonly addProduct: AddProductInterface,
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
      return ResponseDto.serverError(err.message);
    }
  }
}
