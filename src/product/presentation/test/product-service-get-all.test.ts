import { ProductModel } from 'src/product/domain/models/product-model';

import { ProductService } from '../product.service';
import { ResponseDto } from '../../../dto/Response.dto';
import { GetProductsInterfaceStub, makeSut } from './makeSut';

describe('ProductService.getAll() method', () => {
  let productService: ProductService;
  let getProductsStub: GetProductsInterfaceStub;
  let products: ProductModel[];

  beforeEach(() => {
    ({
      productServiceNew: productService,
      getProductsStubNew: getProductsStub,
    } = makeSut());
    products = [
      {
        id: 'id_1',
        title: 'New Product 1',
        price: 100,
        zipcode: '12345',
        seller: 'Seller A',
        thumbnailHd: 'http://example.com/image.jpg',
        activateDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'id_2',
        title: 'New Product 2',
        price: 100,
        zipcode: '12345',
        seller: 'Seller A',
        thumbnailHd: 'http://example.com/image.jpg',
        activateDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'id_3',
        title: 'New Product 3',
        price: 100,
        zipcode: '12345',
        seller: 'Seller A',
        thumbnailHd: 'http://example.com/image.jpg',
        activateDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'id_3',
        title: 'New Product 3',
        price: 100,
        zipcode: '12345',
        seller: 'Seller A',
        thumbnailHd: 'http://example.com/image.jpg',
        activateDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  });

  describe('Happy path', () => {
    test('should call getProducts successfully once and return an array of ProductModel in response', async () => {
      getProductsStub.getAll.mockResolvedValue(products as any as never);

      const result = await productService.getAll();

      expect(result).toEqual(
        ResponseDto.successRequest<ProductModel[]>(products),
      );
      expect(getProductsStub.getAll).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    test('should return an empty array if getPproducts returns an empty empty array', async () => {
      getProductsStub.getAll.mockResolvedValue([]);

      const result = await productService.getAll();

      expect(result).toEqual(ResponseDto.successRequest([]));
      expect(getProductsStub.getAll).toHaveBeenCalled();
    });

    test('should return ServerError when getProducts throws', async () => {
      getProductsStub.getAll.mockRejectedValue(new Error('Any error'));

      const result = await productService.getAll();
      expect(result).toEqual(ResponseDto.serverError('Any error'));
      expect(getProductsStub.getAll).toHaveBeenCalled();
    });
  });
});
