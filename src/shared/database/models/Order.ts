import { Model, Association, Sequelize, DataTypes } from 'sequelize';
import Customer from './Customer';
import Employee from './Employee';

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
  }
}
