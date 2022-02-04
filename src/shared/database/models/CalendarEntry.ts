import { DataTypes, Model, Sequelize } from 'sequelize';
import Activity from './Activity';
import Calendar from './Calendar';
import Customer from './Customer';

export default class CalendarEntry extends Model {
  id: string;
  calendarId: string;
  activityId: number;
  customerId: number;
  dateStart: Date;
  dateEnd: Date;
  notes: String;

  createdAt: Date;
  updatedAt: Date;

  calendar?: Calendar;
  activity?: Activity;
  customer?: Customer;

  static setup(connection: Sequelize) {
    CalendarEntry.init(
      {
        dateStart: DataTypes.DATE,
        dateEnd: DataTypes.DATE,
        notes: DataTypes.STRING
      },
      {
        sequelize: connection,
        tableName: 'calendars_entries'
      }
    );
  }

  static setupAssociations() {
    CalendarEntry.belongsTo(Calendar, {
      foreignKey: 'calendarId',
      as: 'calendar'
    });

    CalendarEntry.belongsTo(Activity, {
      foreignKey: 'activityId',
      as: 'activity'
    });

    CalendarEntry.belongsTo(Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });
  }
}
