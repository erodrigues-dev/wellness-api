import { Sequelize, Model, DataTypes, Association } from 'sequelize';

import IActivity from '../../models/IActivity';
import Employee from './Employee';

export default class Activity extends Model<IActivity> implements IActivity {
  id?: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
  employeeId: number;

  employee?: Employee;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    employee: Association<Activity, Employee>;
  };

  static setup(connection: Sequelize) {
    Activity.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        duration: DataTypes.INTEGER,
        imageUrl: DataTypes.STRING,
        employeeId: DataTypes.NUMBER
      },
      { sequelize: connection, tableName: 'activities' }
    );
  }

  static setupAssociations() {
    Activity.belongsTo(Employee, {
      foreignKey: 'employeeId',
      as: 'employee'
    });
  }
}
