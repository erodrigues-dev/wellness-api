import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import IEmployee from '../../models/entities/IEmployee';
import Employee from './Employee';

export default class Profile extends Model {
  id?: number;
  name: string;
  description: string;
  permissions: number;

  employees?: IEmployee[];

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    employees: Association<Profile, Employee>;
  };

  static setup(connection: Sequelize) {
    Profile.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.INTEGER,
        permissions: DataTypes.INTEGER
      },
      {
        sequelize: connection,
        tableName: 'profiles'
      }
    );
  }

  static setupAssociations() {
    Profile.hasMany(Employee, {
      foreignKey: 'profileId',
      as: 'employees'
    });
  }
}
