import { AddProductInterface } from 'src/product/domain/usecases/add-product.interface';
import { ProductService } from '../product.service';
import { GetProductsInterface } from 'src/product/domain/usecases/get-products.interface';

export class AddProductInterfaceStub implements AddProductInterface {
  add = jest.fn();
}

export class GetProductsInterfaceStub implements GetProductsInterface {
  getAll = jest.fn();
}

type SutType = {
  addProductStubNew: AddProductInterfaceStub;
  getProductsStubNew: GetProductsInterfaceStub;
  productServiceNew: ProductService;
};

export const makeSut = (): SutType => {
  const addProductStubNew = new AddProductInterfaceStub();
  const getProductsStubNew = new GetProductsInterfaceStub();
  const productServiceNew = new ProductService(
    addProductStubNew,
    getProductsStubNew,
  );
  return {
    addProductStubNew,
    getProductsStubNew,
    productServiceNew,
  };
};
