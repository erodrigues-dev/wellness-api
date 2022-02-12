import { DataTypes, Model, Sequelize } from 'sequelize';

export default class CalendarLabel extends Model {
  id: string;
  name: string;
  color: string;

  static setup(connection: Sequelize) {
    CalendarLabel.init(
      {
        name: DataTypes.STRING,
        color: DataTypes.STRING
      },
      { sequelize: connection, tableName: 'calendars_labels' }
    );
  }
}
