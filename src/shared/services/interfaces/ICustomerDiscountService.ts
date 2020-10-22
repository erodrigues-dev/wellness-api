import CustomerDiscountViewModel from '../../viewmodels/CustomerDiscountViewModel';

export interface IStore {
  type: string;
  value: number;
  relationType: 'package' | 'activity';
  relationId: number;
  customerId: number;
  userId: number;
}

export interface IUpdate extends IStore {
  id: number;
}

export interface IFilter {
  relationName?: string;
  customerId?: number;
  page?: number;
  limit?: number;
}

export default interface ICustomerDiscountService {
  list(filter: IFilter): Promise<CustomerDiscountViewModel[]>;
  get(id: number): Promise<CustomerDiscountViewModel>;
  count(filter: IFilter): Promise<number>;
  store(data: IStore): Promise<number>;
  update(data: IUpdate): Promise<void>;
  destroy(id: number): Promise<void>;
}
