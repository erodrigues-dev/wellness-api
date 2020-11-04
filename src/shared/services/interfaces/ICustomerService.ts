import ICustomer from '../../models/entities/ICustomer';

export interface ICustomerFilter {
  name?: string;
  email?: string;
}

export default interface ICustomerService {
  list(
    filter: ICustomerFilter,
    page: number,
    limit: number
  ): Promise<ICustomer[]>;
  count(filter: ICustomerFilter): Promise<number>;
  get(id: number): Promise<ICustomer>;
  create(data: ICustomer): Promise<ICustomer>;
  update(data: ICustomer): Promise<ICustomer>;
}
