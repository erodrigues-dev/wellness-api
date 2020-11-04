import { PaymentTypeEnum } from '../enums/PaymentTypeEnum';

export default interface IOrderIPayment {
  id?: number;
  orderId: number;
  type: PaymentTypeEnum;
  tip: number;
  discount: number;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
