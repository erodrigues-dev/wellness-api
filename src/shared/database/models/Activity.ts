import { DataTypes, Model, Sequelize } from 'sequelize';
import ActivityEmployee from './ActivityEmployee';

import Category from './Category';
import Employee from './Employee';
import Waiver from './Waiver';

export default class Activity extends Model {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
  categoryId: number;
  maxPeople?: number;
  showInWeb: boolean;
  showInApp: boolean;
  waiverId: number;

  employee?: Employee;
  category?: Category;
  waiver?: Waiver;

  PackageActivity?: {
    quantity: number;
  };

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static setup(connection: Sequelize) {
    Activity.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        duration: DataTypes.INTEGER,
        imageUrl: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        maxPeople: DataTypes.INTEGER,
        showInApp: DataTypes.BOOLEAN,
        showInWeb: DataTypes.BOOLEAN,
        waiverId: DataTypes.INTEGER
      },
      { sequelize: connection, tableName: 'activities' }
    );
  }

  static setupAssociations() {
    Activity.belongsTo(Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });

    Activity.belongsTo(Waiver, {
      foreignKey: 'waiverId',
      as: 'waiver'
    });

    Activity.belongsToMany(Employee, {
      through: ActivityEmployee
    });
  }
}
