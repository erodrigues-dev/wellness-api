import { OrderItemTypeEnum } from '../enums/OrderItemTypeEnum';
import { PackageTypeEnum } from '../enums/PackageTypeEnum';
import { RecurrencyPayEnum } from '../enums/RecurrencyPayEnum';

export default interface IOrderItem {
  id?: number;
  orderId: number;
  type: OrderItemTypeEnum;
  metadataId: number;
  parentId?: number;
  name: string;
  price: number;
  quantity: number;
  recurrency?: RecurrencyPayEnum;
  valueType?: PackageTypeEnum;
  value?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
