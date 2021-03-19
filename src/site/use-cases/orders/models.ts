export type OrderType = 'activity' | 'package';

export interface OrderListViewModel {
  id: number;
  title: string;
  image_url: string;
  category: string;
  type: OrderType;
  status: string;
  payment_type: string;
  created_at: Date;
}

export interface OrderDetailViewModel {
  id: number;
  title: string;
  description: string;
  image_url: string;
  type: OrderType;

  amount: number;
  tip: number;
  discount: number;
  quantity: number;
  payment_type: string;
  status: string;

  recurrency: string;
  package_type: string;
  package_total: number;
  expiration_date: Date;

  paid_until_date: Date;
  canceled_date: Date;
  created_at: Date;

  activities: {
    id: number;
    title: string;
    category: string;
    duration: number;
    quantity: number;
  }[];
}
