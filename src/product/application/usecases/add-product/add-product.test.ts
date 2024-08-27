import {
  AddProductModel,
  ProductModel,
} from 'src/product/domain/models/product-model';

import { AddProduct } from './add-product';
import { AddProductInterface } from 'src/product/domain/usecases/add-product.interface';
import { AddProductRepositoryInterface } from '../../interfaces/add-product-repository.interface';
import { FindProductByTitleRepositoryInterface } from '../../interfaces/find-product-by-title-repository.interface';

// Mock classes for dependencies
class AddProductRepositoryInterfaceStub
  implements AddProductRepositoryInterface
{
  save = jest.fn();
}

class FindProductByTitleRepositoryInterfaceStub
  implements FindProductByTitleRepositoryInterface
{
  findByTitle = jest.fn();
}

describe('AddProduct.add() add method', () => {
  let addProduct: AddProductInterface;
  let addRepositoryStub: AddProductRepositoryInterfaceStub;
  let findByTitleRepositoryStub: FindProductByTitleRepositoryInterfaceStub;
  let product: AddProductModel;

  beforeEach(() => {
    addRepositoryStub = new AddProductRepositoryInterfaceStub();
    findByTitleRepositoryStub = new FindProductByTitleRepositoryInterfaceStub();
    addProduct = new AddProduct(addRepositoryStub, findByTitleRepositoryStub);
    product = {
      title: 'New Product',
      price: 100,
      zipcode: '12345',
      seller: 'Seller A',
      thumbnailHd: 'http://example.com/image.jpg',
      activateDate: new Date(),
    };
  });

  describe('Happy path', () => {
    test('should add a product successfully when it does not exist', async () => {
      // Arrange
      const savedProduct: ProductModel = {
        id: '1',
        ...product,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      findByTitleRepositoryStub.findByTitle.mockResolvedValue(
        [] as any as never,
      );
      addRepositoryStub.save.mockResolvedValue(savedProduct as any as never);

      // Act
      const result = await addProduct.add(product);

      // Assert
      expect(result).toEqual(savedProduct);
      expect(findByTitleRepositoryStub.findByTitle).toHaveBeenCalledWith(
        product.title,
      );
      expect(addRepositoryStub.save).toHaveBeenCalledWith(product);
    });
  });

  describe('Edge cases', () => {
    test('should return null if the product already exists', async () => {
      // Arrange
      const existingProduct: ProductModel = {
        id: '1',
        ...product,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      findByTitleRepositoryStub.findByTitle.mockResolvedValue([
        existingProduct,
      ] as any as never);

      // Act
      const result = await addProduct.add(product);

      // Assert
      expect(result).toBeNull();
      expect(findByTitleRepositoryStub.findByTitle).toHaveBeenCalledWith(
        product.title,
      );
      expect(addRepositoryStub.save).not.toHaveBeenCalled();
    });

    test('should handle errors thrown by the repository gracefully', async () => {
      // Arrange
      findByTitleRepositoryStub.findByTitle.mockRejectedValue(
        new Error('Database error') as never,
      );

      // Act & Assert
      await expect(addProduct.add(product)).rejects.toThrow('Database error');
      expect(findByTitleRepositoryStub.findByTitle).toHaveBeenCalledWith(
        product.title,
      );
      expect(addRepositoryStub.save).not.toHaveBeenCalled();
    });
  });
});
