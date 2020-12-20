import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import IEmployee from '../../models/entities/IEmployee';
import Profile from './Profile';

export default class Employee extends Model<IEmployee> implements IEmployee {
  id?: number;
  name: string;
  email: string;
  password: string;
  specialty: string;
  imageUrl?: string;

  profileId: number;
  profile?: Profile;

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
        imageUrl: DataTypes.STRING,
        profileId: DataTypes.INTEGER
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
