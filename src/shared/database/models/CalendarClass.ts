import { DataTypes, Model, Sequelize } from 'sequelize'
import Activity from './Activity'
import Calendar from './Calendar'

export default class CalendarClass extends Model {
  id: String
  calendarId: String
  activityId: Number

  dateStart: Date
  dateEnd: Date
  slots: Number
  recurrenceRule: String
  recurrenceExceptions: String
  color: String
  notes: String

  calendar?: Calendar
  activity?: Activity

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date

  static setup(connection: Sequelize) {
    CalendarClass.init(
      {
        dateStart: DataTypes.DATE,
        dateEnd: DataTypes.DATE,
        slots: DataTypes.INTEGER,
        recurrenceRule: DataTypes.STRING,
        recurrenceExceptions: DataTypes.STRING,
        color: DataTypes.STRING,
        notes: DataTypes.STRING
      },
      { sequelize: connection, tableName: 'calendars_class', paranoid: true }
    )
  }

  static setupAssociations() {
    CalendarClass.belongsTo(Calendar, {
      foreignKey: 'calendarId',
      as: 'calendar'
    })

    CalendarClass.belongsTo(Activity, {
      foreignKey: 'activityId',
      as: 'activity'
    })
  }
}
