import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import Customer from './Customer';
import Employee from './Employee';
import OrderItem from './OrderItem';

export default class Order extends Model {
  id: number;
  customerId: number;

  amount: number;
  discount: number;
  tip: number;

  userId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    customer: Association<Order, Customer>;
    user: Association<Order, Employee>;
    items: Association<Order, OrderItem>;
  };

  static setup(connection: Sequelize) {
    Order.init(
      {
        amount: DataTypes.DECIMAL,
        discount: DataTypes.DECIMAL,
        tip: DataTypes.DECIMAL
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
  }
}
