import { Model, DataTypes, Association, Sequelize } from 'sequelize';

import Profile from './Profile';

import IProfile from '../../models/IProfile';
import IEmployee from '../../models/IEmployee';

export default class Employee extends Model<IEmployee> implements IEmployee {
  id?: number;
  name: string;
  email: string;
  password: string;
  specialty: string;
  imageUrl: string;

  profile: IProfile;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    profile: Association<Employee, Profile>;
  };

  static setup(connection: Sequelize) {
    Employee.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        specialty: DataTypes.STRING,
        imageUrl: DataTypes.STRING
      },
      {
        sequelize: connection,
        tableName: 'employees'
      }
    );
  }

  static setupAssociations() {
    Employee.belongsTo(Profile, {
      foreignKey: 'profileId',
      as: 'profile'
    });
  }
}
