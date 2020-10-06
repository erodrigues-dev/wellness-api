import { Sequelize, Model, DataTypes, Association } from 'sequelize';

import IActivity from '../../models/IActivity';
import Category from './Category';
import Employee from './Employee';

export default class Activity extends Model<IActivity> {
  id?: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
  employeeId: number;
  categoryId: number;
  maxPeople?: number;
  showInWeb: boolean;
  showInApp: boolean;

  employee?: Employee;
  category?: Category;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    employee: Association<Activity, Employee>;
    category: Association<Activity, Category>;
  };

  static setup(connection: Sequelize) {
    Activity.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        duration: DataTypes.INTEGER,
        imageUrl: DataTypes.STRING,
        employeeId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        maxPeople: DataTypes.INTEGER,
        showInApp: DataTypes.BOOLEAN,
        showInWeb: DataTypes.BOOLEAN
      },
      { sequelize: connection, tableName: 'activities' }
    );
  }

  static setupAssociations() {
    Activity.belongsTo(Employee, {
      foreignKey: 'employeeId',
      as: 'employee'
    });

    Activity.belongsTo(Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
  }
}
