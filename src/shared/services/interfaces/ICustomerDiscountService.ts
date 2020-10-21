import CustomerDiscount from '../../database/models/CustomerDiscount';
import ICustomerDiscount from '../../models/ICustomerDiscount';

export interface IStore {
  type: string;
  value: number;
  relationType: string;
  relationId: number;
  customerId: number;
  userId: number;
}

export interface IUpdate extends IStore {
  id: number;
}

export default interface ICustomerDiscountService {
  list(customerId?: number): Promise<CustomerDiscount[]>;
  count(customerId?: number): Promise<number>;
  store(data: IStore): Promise<CustomerDiscount>;
  update(data: IUpdate): Promise<CustomerDiscount>;
  destroy(id: number, customerId?: number): Promise<void>;
}
