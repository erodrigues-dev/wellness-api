import { DataTypes, Model, Sequelize } from 'sequelize';
import Calendar from './Calendar';

export default class CalendarAvailability extends Model {
  id: string;
  calendarId: number;
  start: Date;
  end: Date;
  recurrenceRule: string;
  recurrenceExceptions: string;
  status: string;

  createdAt: Date;
  updatedAt: Date;

  calendar?: Calendar;

  static setup(connection: Sequelize) {
    CalendarAvailability.init(
      {
        start: DataTypes.DATE,
        end: DataTypes.DATE,
        recurrenceRule: DataTypes.STRING,
        recurrenceExceptions: DataTypes.STRING,
        status: DataTypes.STRING
      },
      { sequelize: connection, tableName: 'calendar_availabilities' }
    );
  }

  static setupAssociations() {
    CalendarAvailability.belongsTo(Calendar, {
      as: 'calendar',
      foreignKey: 'calendarId'
    });
  }
}
