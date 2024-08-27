import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from '../presentation/product.service';
import { AddProductDTO } from '../dto/AddProduct.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private service: ProductService) {}

  @Post()
  @ApiOperation({
    summary: 'This will add new a product',
  })
  async add(@Body() product: AddProductDTO) {
    return await this.service.add(product);
  }
}
