export type ProductType = 'activity' | 'package';

export interface ProductListViewModel {
  id: number;
  title: string;
  category: string;
  image_url: string;
  price: number;
  type: ProductType;
}

export interface ProductDetailViewModel {
  id: number;
  title: string;
  category: string;
}
