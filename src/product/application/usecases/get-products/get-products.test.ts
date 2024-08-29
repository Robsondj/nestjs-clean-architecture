import { ProductModel } from 'src/product/domain/models/product-model';

import { GetProducts } from './get-products';
import { FindAllProductsRepositoryInterface } from '../../interfaces/find-all-products-repository.interface';
import { GetProductsInterface } from 'src/product/domain/usecases/get-products.interface';

class FindAllProductsRepositoryInterfaceStub
  implements FindAllProductsRepositoryInterface
{
  findAll = jest.fn();
}

describe('GetProducts.findAll() method', () => {
  let getProducts: GetProductsInterface;
  let findAllProductsRepositoryInterfaceStub: FindAllProductsRepositoryInterfaceStub;
  const products: ProductModel[] = [
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

  beforeEach(() => {
    findAllProductsRepositoryInterfaceStub =
      new FindAllProductsRepositoryInterfaceStub();
    getProducts = new GetProducts(findAllProductsRepositoryInterfaceStub);
  });

  describe('Happy path', () => {
    test('should return a list of products successfully', async () => {
      findAllProductsRepositoryInterfaceStub.findAll.mockResolvedValue(
        products as any as never,
      );

      const result = await getProducts.getAll();

      expect(result).toEqual(products);
      expect(findAllProductsRepositoryInterfaceStub.findAll).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    test('should return [] if no products were found', async () => {
      findAllProductsRepositoryInterfaceStub.findAll.mockResolvedValue(
        [] as any as never,
      );

      const result = await getProducts.getAll();

      expect(result).toEqual([]);
      expect(findAllProductsRepositoryInterfaceStub.findAll).toHaveBeenCalled();
    });

    test('should handle errors thrown by the repository gracefully', async () => {
      findAllProductsRepositoryInterfaceStub.findAll.mockRejectedValue(
        new Error('Database error') as never,
      );

      await expect(getProducts.getAll()).rejects.toThrow('Database error');
      expect(findAllProductsRepositoryInterfaceStub.findAll).toHaveBeenCalled();
    });
  });
});
