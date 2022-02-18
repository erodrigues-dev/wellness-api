import { DataTypes, Model, Sequelize } from 'sequelize'
import Activity from './Activity'
import Calendar from './Calendar'
import CalendarLabel from './CalendarLabel'
import Customer from './Customer'

export default class CalendarAppointment extends Model {
  id: string
  calendarId: string
  activityId: number
  customerId: number
  calendarLabelId: string
  dateStart: Date
  dateEnd: Date
  notes: string

  createdAt: Date
  updatedAt: Date
  canceledAt: Date

  calendar?: Calendar
  activity?: Activity
  customer?: Customer
  calendarLabel?: CalendarLabel

  static setup(connection: Sequelize) {
    CalendarAppointment.init(
      {
        dateStart: DataTypes.DATE,
        dateEnd: DataTypes.DATE,
        notes: DataTypes.STRING,
        canceledAt: DataTypes.DATE
      },
      {
        sequelize: connection,
        tableName: 'calendars_entries',
        paranoid: true,
        deletedAt: 'canceledAt'
      }
    )
  }

  static setupAssociations() {
    CalendarAppointment.belongsTo(Calendar, {
      foreignKey: 'calendarId',
      as: 'calendar'
    })

    CalendarAppointment.belongsTo(Activity, {
      foreignKey: 'activityId',
      as: 'activity'
    })

    CalendarAppointment.belongsTo(Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    })

    CalendarAppointment.belongsTo(CalendarLabel, {
      foreignKey: 'labelId',
      as: 'label'
    })
  }
}
