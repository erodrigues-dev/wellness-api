import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import Customer from './Customer';
import Employee from './Employee';
import OrderItem from './OrderItem';
import OrderPayment from './OrderPayment';

export default class Order extends Model {
  id?: number;
  customerId: number;
  subtotal: number;
  tip: number;
  discount: number;
  total: number;
  userId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    customer: Association<Order, Customer>;
    user: Association<Order, Employee>;
    items: Association<Order, OrderItem>;
    payments: Association<Order, OrderPayment>;
  };

  static setup(connection: Sequelize) {
    Order.init(
      {
        subtotal: DataTypes.DECIMAL,
        tip: DataTypes.DECIMAL,
        discount: DataTypes.DECIMAL,
        total: DataTypes.DECIMAL
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

    Order.hasMany(OrderItem, {
      foreignKey: 'orderId',
      as: 'items'
    });

    Order.hasMany(OrderPayment, {
      foreignKey: 'orderId',
      as: 'payments'
    });
  }
}
