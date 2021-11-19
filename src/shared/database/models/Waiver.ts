import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Waiver extends Model {
  id: number;
  title: string;
  text: string;

  createdAt: Date;
  updatedAt: Date;

  static setup(connection: Sequelize) {
    Waiver.init(
      {
        title: DataTypes.STRING,
        text: DataTypes.STRING
      },
      { sequelize: connection, tableName: 'waivers' }
    );
  }
}
