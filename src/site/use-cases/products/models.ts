export type ProductType = 'activity' | 'package';

export interface ProductListViewModel {
  id: number;
  type: ProductType;
  title: string;
  category: string;
  image_url: string;
  price: number;
}

export interface ProductDetailViewModel<TInfo = CommonInfo> {
  id: number;
  type: ProductType;
  title: string;
  image_url: string;
  description: string;
  info: TInfo;
}

export interface CommonInfo {
  price: number;
  category: string;
  recurrency?: string;
}

export interface ProductInfoActivity extends CommonInfo {
  duration: number;
  max_peoples?: number;
}

export interface ProductInfoPackage extends CommonInfo {
  type: string;
  total?: number;
  expiration?: Date;
  items: PackageItem[];
}

export interface PackageItem extends ProductListViewModel {
  quantity?: number;
}
