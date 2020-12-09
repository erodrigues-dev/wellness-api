import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import IOrderPayment from '../../models/entities/IOrderPayment';
import { PaymentStatusEnum } from '../../models/enums/PaymentStatusEnum';
import { PaymentTypeEnum } from '../../models/enums/PaymentTypeEnum';
import { RecurrencyPayEnum } from '../../models/enums/RecurrencyPayEnum';
import Order from './Order';

export default class OrderPayment extends Model implements IOrderPayment {
  id: number;
  orderId: number;
  type: PaymentTypeEnum;
  tip: number;
  discount: number;
  amount: number;
  recurrency: RecurrencyPayEnum;
  dueDate: Date;

  transactionId: string;
  status: PaymentStatusEnum;
  statusDate: Date;
  paidUntilDate: Date;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    order: Association<OrderPayment, Order>;
  };

  static setup(connection: Sequelize) {
    OrderPayment.init(
      {
        type: DataTypes.STRING,
        tip: DataTypes.DECIMAL,
        discount: DataTypes.DECIMAL,
        amount: DataTypes.DECIMAL,
        transactionId: DataTypes.STRING,
        recurrency: DataTypes.STRING,
        status: DataTypes.STRING,
        dueDate: DataTypes.DATEONLY,
        statusDate: DataTypes.DATE,
        paidUntilDate: DataTypes.DATE
      },
      {
        sequelize: connection,
        tableName: 'order_payments'
      }
    );
  }

  static setupAssociations() {
    OrderPayment.belongsTo(Order, {
      foreignKey: 'orderId',
      as: 'order'
    });
  }
}
