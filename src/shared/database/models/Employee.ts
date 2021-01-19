import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import Profile from './Profile';

export default class Employee extends Model {
  id?: number;
  name: string;
  email: string;
  password: string;
  specialty: string;
  imageUrl?: string;
  phone: string;

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
        profileId: DataTypes.INTEGER,
        phone: DataTypes.STRING
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
