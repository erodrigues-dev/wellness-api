import { PaymentStatusEnum } from '../enums/PaymentStatusEnum';
import { PaymentTypeEnum } from '../enums/PaymentTypeEnum';
import { RecurrencyPayEnum } from '../enums/RecurrencyPayEnum';

export default interface IOrderPayment {
  id?: number;
  orderId: number;
  type: PaymentTypeEnum;
  tip: number;
  discount: number;
  amount: number;
  transactionId?: string;
  recurrency: RecurrencyPayEnum;
  status: PaymentStatusEnum;
  dueDate?: Date;
  statusDate?: Date;
}
