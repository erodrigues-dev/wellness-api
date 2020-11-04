import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import { PaymentTypeEnum } from '../../models/enums/PaymentTypeEnum';
import Order from './Order';

export default class OrderPayment extends Model {
  id?: number;
  orderId: number;
  type: PaymentTypeEnum;
  tip: number;
  discount: number;
  amount: number;
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
        amount: DataTypes.DECIMAL
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
