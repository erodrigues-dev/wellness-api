import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import Customer from './Customer';
import Employee from './Employee';

export default class Order extends Model {
  id?: number;
  customerId: number;
  subtotal: number;
  tip: number;
  discount: number;
  amount: number;
  userId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    customer: Association<Order, Customer>;
    user: Association<Order, Employee>;
  };

  static setup(connection: Sequelize) {
    Order.init(
      {
        subtotal: DataTypes.DECIMAL,
        tip: DataTypes.DECIMAL,
        discount: DataTypes.DECIMAL,
        amount: DataTypes.DECIMAL
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
  }
}
