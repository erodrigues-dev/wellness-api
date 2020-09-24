import { Sequelize, Model, DataTypes } from 'sequelize';

import IActivity from '../../models/IActivity';

export default class Activity extends Model<IActivity> implements IActivity {
  id?: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
  employeeId: number;

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
        employeeId: DataTypes.NUMBER
      },
      { sequelize: connection, tableName: 'activities' }
    );
  }

  static setupAssociations() {}
}
