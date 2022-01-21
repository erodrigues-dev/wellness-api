import { DataTypes, Model, Sequelize } from 'sequelize';
import Calendar from './Calendar';

export default class CalendarSlot extends Model {
  id: string;
  calendarId: string;
  start: Date;
  end: Date;
  recurrenceRule: string;
  recurrenceExceptions: string;
  status: string;

  createdAt: Date;
  updatedAt: Date;

  calendar?: Calendar;

  static setup(connection: Sequelize) {
    CalendarSlot.init(
      {
        start: DataTypes.DATE,
        end: DataTypes.DATE,
        recurrenceRule: DataTypes.STRING,
        recurrenceExceptions: DataTypes.STRING,
        status: DataTypes.STRING
      },
      { sequelize: connection, tableName: 'calendars_slots' }
    );
  }

  static setupAssociations() {
    CalendarSlot.belongsTo(Calendar, {
      as: 'calendar',
      foreignKey: 'calendarId'
    });
  }
}
