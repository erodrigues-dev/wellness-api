import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import Profile from './Profile';
import Specialty from './Specialty';

export default class Employee extends Model {
  id?: number;
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  phone: string;
  tempPassword: string;
  specialtyId?: number;

  profileId: number;
  profile?: Profile;
  specialty?: Specialty;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;

  static associations: {
    profile: Association<Employee, Profile>;
  };

  static setup(connection: Sequelize) {
    Employee.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        profileId: DataTypes.INTEGER,
        phone: DataTypes.STRING,
        tempPassword: DataTypes.STRING,
        specialtyId: DataTypes.INTEGER
      },
      {
        sequelize: connection,
        tableName: 'employees',
        paranoid: true
      }
    );
  }

  static setupAssociations() {
    Employee.belongsTo(Profile, {
      foreignKey: 'profileId',
      as: 'profile'
    });

    Employee.belongsTo(Specialty, {
      foreignKey: 'specialtyId',
      as: 'specialty'
    });
  }
}
