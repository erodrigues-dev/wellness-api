import { DataTypes, Model, Sequelize } from 'sequelize';

import Activity from './Activity';
import Category from './Category';
import Employee from './Employee';
import Order from './Order';
import OrderPackage from './OrderPackage';

export default class OrderActivity extends Model {
  id: number;
  orderId: number;
  activityId: number;
  orderPackageId?: number;
  name: string;
  price: number;
  description: string;
  duration: number;
  employeeId: number;
  categoryId: number;
  maxPeople: number;

  packageQuantity?: number;

  readonly createdAt: Date;
  readonly updatedAt?: Date;

  order?: Order;
  orderPackage?: OrderPackage;
  activity?: Activity;
  category?: Category;
  employee?: Employee;

  static setup(connection: Sequelize) {
    OrderActivity.init(
      {
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        description: DataTypes.STRING,
        duration: DataTypes.INTEGER,
        maxPeople: DataTypes.INTEGER,
        packageQuantity: DataTypes.INTEGER
      },
      { sequelize: connection, tableName: 'order_activities' }
    );
  }

  static setupAssociations() {
    OrderActivity.belongsTo(Order, {
      foreignKey: 'orderId',
      as: 'order'
    });

    OrderActivity.belongsTo(OrderPackage, {
      foreignKey: 'orderPackageId',
      as: 'orderPackage'
    });

    OrderActivity.belongsTo(Activity, {
      foreignKey: 'activityId',
      as: 'activity'
    });

    OrderActivity.belongsTo(Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });

    OrderActivity.belongsTo(Employee, {
      foreignKey: 'employeeId',
      as: 'employee'
    });
  }
}
