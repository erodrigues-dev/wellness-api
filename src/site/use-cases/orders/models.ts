export type OrderType = 'activity' | 'package';

export interface OrderListViewModel {
  id: number;
  title: string;
  category: string;
  type: OrderType;
  image_url: string;
}

export interface OrderDetailViewModel {
  id: number;
  title: string;
  description: string;
  image_url: string;
  type: OrderType;

  price: number;
  quantity: number;
  discount: number;
  total: number;
  payment_type: string;

  activities?: OrderActivityViewModel[];
  info?: PackageInfoViewModel;

  created_at: Date;
}

export interface PackageInfoViewModel {
  recurrency: string;
  type: string;
  total_type?: number;
  expiration_at?: Date;
}

export interface OrderActivityViewModel {
  id: number;
  title: string;
  image_url: string;
  category: string;
  duration: number;
  quantity?: number;
}
