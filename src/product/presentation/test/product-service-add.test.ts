import { ProductModel } from 'src/product/domain/models/product-model';

import { AddProductDTO } from '../../dto/AddProduct.dto';
import { ProductService } from '../product.service';
import { ResponseDto } from '../../../dto/Response.dto';
import { AddProductInterfaceStub, makeSut } from './makeSut';

describe('ProductService.add() add method', () => {
  let productService: ProductService;
  let addProductStub: AddProductInterfaceStub;
  let productDTO: AddProductDTO;

  beforeEach(() => {
    ({ productServiceNew: productService, addProductStubNew: addProductStub } =
      makeSut());
    productDTO = {
      title: 'New Product',
      price: 100,
      zipcode: '12345',
      seller: 'Seller A',
      thumbnailHd: 'http://example.com/image.jpg',
      activateDate: new Date().toDateString(),
    };
  });

  describe('Happy path', () => {
    test('should call addProduct successfully with correct params and return a ProductModel response', async () => {
      const savedProduct: ProductModel = {
        id: '1',
        ...productDTO,
        activateDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addProductStub.add.mockResolvedValue(savedProduct as any as never);

      const result = await productService.add(productDTO);

      expect(result).toEqual(
        ResponseDto.successRequest<ProductModel>(savedProduct),
      );
      expect(addProductStub.add).toHaveBeenCalledWith(productDTO);
    });
  });

  describe('Edge cases', () => {
    test('should return Bad Reques if the price is equal or lower than zero', async () => {
      const result = await productService.add({ ...productDTO, price: 0 });

      expect(result).toEqual(ResponseDto.badRequest('Invalid product price.'));
      expect(addProductStub.add).not.toHaveBeenCalled();
    });

    test('should return forbidden if the product already exists', async () => {
      addProductStub.add.mockResolvedValue(null);

      const result = await productService.add(productDTO);

      expect(result).toEqual(ResponseDto.forbidden('Product already exists.'));
      expect(addProductStub.add).toHaveBeenCalledWith(productDTO);
    });

    test('should return ServerError when addProduct throws', async () => {
      addProductStub.add.mockRejectedValue(new Error('Any error'));

      const result = await productService.add(productDTO);
      expect(result).toEqual(ResponseDto.serverError('Any error'));
      expect(addProductStub.add).toHaveBeenCalledWith(productDTO);
    });
  });
});
