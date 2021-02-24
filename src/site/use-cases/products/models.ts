export type ProductType = 'activity' | 'package';

export interface ProductListViewModel {
  id: number;
  type: ProductType;
  title: string;
  category: string;
  image_url: string;
  price: number;
}

export interface ProductDetailViewModel<TInfo = any> {
  id: number;
  type: ProductType;
  title: string;
  image_url: string;
  description: string;
  info: TInfo;
}

export interface ProductInfoActivity {
  duration: number;
  price: number;
  max_peoples?: number;
  category: string;
}

export interface ProductInfoPackage {
  price: number;
  category: string;
  recurrency: string;
  type: string;
  total?: number;
  expiration?: Date;
  items: PackageItem[];
}

export interface PackageItem extends ProductListViewModel {
  quantity?: number;
}
