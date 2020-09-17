import { Model, DataTypes, Association, Sequelize } from 'sequelize';

import Employee from './Employee';
import Functionality from './Functionality';

import IEmployee from '../../models/IEmployee';
import IProfile from '../../models/IProfile';

export default class Profile extends Model<IProfile> implements IProfile {
  id?: number;
  name: string;
  description: string;

  functionalities: Functionality[];
  employees: IEmployee[];

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    employees: Association<Profile, Employee>;
    functionalities: Association<Profile, Functionality>;
  };

  static setup(connection: Sequelize) {
    Profile.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.INTEGER
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

    Profile.hasMany(Functionality, {
      foreignKey: 'profileId',
      as: 'functionalities'
    });
  }
}
