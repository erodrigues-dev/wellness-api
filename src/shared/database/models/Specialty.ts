import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Specialty extends Model {
  id: number;
  name: string;

  createdAt: Date;
  updatedAt: Date;

  static setup(connection: Sequelize) {
    Specialty.init(
      {
        name: DataTypes.STRING
      },
      { sequelize: connection, tableName: 'specialties' }
    );
  }
}
