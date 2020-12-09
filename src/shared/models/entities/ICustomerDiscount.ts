import IBaseModel from './IBaseModel';

export default interface ICustomerDiscount extends IBaseModel {
  relationType: 'package' | 'activity';
  relationId: number;
  relationName: string;

  type: 'percent' | 'amount';
  value: number;

  customerId: number;
  userId: number;
}
