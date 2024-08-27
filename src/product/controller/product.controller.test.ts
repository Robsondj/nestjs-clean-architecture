import { ProductService } from '../presentation/product.service';
import { AddProductDTO } from '../dto/AddProduct.dto';
import { ProductController } from './product.controller';
import { Test, TestingModule } from '@nestjs/testing';

class ProductServiceStub {
  add = jest.fn();
}

describe('ProductController.add() add method', () => {
  let productController: ProductController;
  let productServiceStub: ProductServiceStub;
  let productDto: AddProductDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useClass: ProductServiceStub,
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productServiceStub = module.get<ProductService>(ProductService) as any;
    productDto = {
      title: 'Sample Product',
      price: 100.0,
      zipcode: '12345-678',
      seller: 'Sample Seller',
      thumbnailHd: 'https://cdn.aws.com.br/600x450/21/21351/produto/image.jpg',
      activateDate: '2024-01-01',
    };
  });

  describe('Happy Path', () => {
    it('should add a product successfully', async () => {
      const expectedResult = { success: true, id: 1 };
      productServiceStub.add.mockResolvedValue(expectedResult as any as never);

      const result = await productController.add(productDto);

      expect(result).toEqual(expectedResult);
      expect(productServiceStub.add).toHaveBeenCalledWith(productDto);
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing optional activateDate', async () => {
      const expectedResult = { success: true, id: 2 };
      productServiceStub.add.mockResolvedValue(expectedResult as any as never);

      const result = await productController.add({
        ...productDto,
        activateDate: undefined,
      });

      expect(result).toEqual(expectedResult);
      expect(productServiceStub.add).toHaveBeenCalledWith({
        ...productDto,
        activateDate: undefined,
      });
    });

    it('should throw an error if title is empty', async () => {
      productServiceStub.add.mockRejectedValue(
        new Error('Validation failed') as never,
      );

      await expect(
        productController.add({ ...productDto, title: '' }),
      ).rejects.toThrow('Validation failed');
      expect(productServiceStub.add).toHaveBeenCalledWith({
        ...productDto,
        title: '',
      });
    });

    it('should throw an error if price is not a number', async () => {
      productServiceStub.add.mockRejectedValue(
        new Error('Validation failed') as never,
      );

      await expect(
        productController.add({ ...productDto, price: 'not-a-number' as any }),
      ).rejects.toThrow('Validation failed');
      expect(productServiceStub.add).toHaveBeenCalledWith({
        ...productDto,
        price: 'not-a-number' as any,
      });
    });
  });
});
