import CustomerDiscount from '../../database/models/CustomerDiscount';
import { DiscountTypeEnum } from '../../models/enums/DiscountTypeEnum';
import CustomerDiscountViewModel from '../../models/viewmodels/CustomerDiscountViewModel';

export interface IStore {
  type: DiscountTypeEnum;
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
  find(
    customerId: number,
    relationType: string,
    relationId: number
  ): Promise<CustomerDiscount>;
  count(filter: IFilter): Promise<number>;
  store(data: IStore): Promise<number>;
  update(data: IUpdate): Promise<void>;
  destroy(id: number): Promise<void>;
}
