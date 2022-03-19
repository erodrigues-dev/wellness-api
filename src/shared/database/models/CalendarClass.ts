import { DataTypes, Model, Sequelize } from 'sequelize'
import Activity from './Activity'
import Calendar from './Calendar'
import CalendarAppointment from './CalendarAppointment'

export default class CalendarClass extends Model {
  id: string
  recurrenceId: string
  calendarId: string
  activityId: number

  dateStart: Date
  dateEnd: Date
  slots: number
  recurrenceRule: string
  color: string
  notes: string

  calendar?: Calendar
  activity?: Activity
  appointments?: CalendarAppointment[]

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date

  static setup(connection: Sequelize) {
    CalendarClass.init(
      {
        recurrenceId: DataTypes.STRING,
        dateStart: DataTypes.DATE,
        dateEnd: DataTypes.DATE,
        slots: DataTypes.INTEGER,
        recurrenceRule: DataTypes.STRING,
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

    CalendarClass.hasMany(CalendarAppointment, {
      foreignKey: 'calendarClassId',
      as: 'appointments'
    })
  }
}
