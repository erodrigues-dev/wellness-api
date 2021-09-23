import { DataTypes, Model, Sequelize } from 'sequelize';
import { Calendar } from './Calendar';

export class CalendarAvailability extends Model {
  id: number;
  calendarId: number;
  startDate: Date;
  endDate: Date;
  recurrency: string;
  status: string;

  createdAt: Date;
  updatedAt: Date;

  calendar?: Calendar;

  static setup(connection: Sequelize) {
    CalendarAvailability.init(
      {
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        recurrency: DataTypes.STRING,
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
