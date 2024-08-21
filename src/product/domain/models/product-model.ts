export interface AddProductModel {
  title: string;
  price: number;
  zipcode: string;
  seller: string;
  thumbnailHd: string;
  activateDate: Date | null;
}

export interface ProductModel {
  id: string;
  title: string;
  price: number;
  zipcode: string;
  seller: string;
  thumbnailHd: string;
  activateDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
