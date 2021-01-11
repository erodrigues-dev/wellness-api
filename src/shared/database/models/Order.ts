import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import { OrderItemTypeEnum } from '../../models/enums/OrderItemTypeEnum';
import { PaymentStatusEnum } from '../../models/enums/PaymentStatusEnum';
import { PaymentTypeEnum } from '../../models/enums/PaymentTypeEnum';
import Customer from './Customer';
import Employee from './Employee';
import OrderActivity from './OrderActivity';
import OrderPackage from './OrderPackage';

export default class Order extends Model {
  id?: number;
  customerId: number;
  type: OrderItemTypeEnum;

  amount: number;
  discount: number;
  tip: number;
  quantity: number;

  paymentType: PaymentTypeEnum;
  status: PaymentStatusEnum;
  transactionId: string;
  transactionType: string;
  webhookDate?: Date;
  paidUntilDate?: Date;

  userId?: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  customer?: Customer;
  orderPackages?: OrderPackage[];
  orderActivities?: OrderActivity[];
  user?: Employee;

  static setup(connection: Sequelize) {
    Order.init(
      {
        type: DataTypes.STRING,
        paymentType: DataTypes.STRING,
        transactionId: DataTypes.STRING,
        transactionType: DataTypes.STRING,
        status: DataTypes.STRING,
        amount: DataTypes.DECIMAL,
        discount: DataTypes.DECIMAL,
        tip: DataTypes.DECIMAL,
        quantity: DataTypes.INTEGER,
        webhookDate: DataTypes.DATE,
        paidUntilDate: DataTypes.DATE
      },
      { sequelize: connection, tableName: 'orders' }
    );
  }

  static setupAssociations() {
    Order.belongsTo(Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });

    Order.belongsTo(Employee, {
      foreignKey: 'userId',
      as: 'user'
    });

    Order.hasMany(OrderPackage, {
      foreignKey: 'orderId',
      as: 'orderPackages'
    });

    Order.hasMany(OrderActivity, {
      foreignKey: 'orderId',
      as: 'orderActivities'
    });
  }
}
