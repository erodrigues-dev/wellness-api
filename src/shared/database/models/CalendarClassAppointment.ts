import { DataTypes, Model, Sequelize } from 'sequelize'
import CalendarClass from './CalendarClass'
import CalendarLabel from './CalendarLabel'
import Customer from './Customer'

export default class CalendarClassAppointment extends Model {
  id: string
  customerId: number
  calendarClassId: string
  calendarLabelId: string
  dateStart: Date
  dateEnd: Date
  notes: string

  customer?: Customer
  calendarClass?: CalendarClass
  calendarLabel?: CalendarLabel

  createdAt?: Date
  updatedAt?: Date
  canceledAt?: Date

  static setup(connection: Sequelize) {
    CalendarClassAppointment.init(
      {
        dateStart: DataTypes.DATE,
        dateEnd: DataTypes.DATE,
        notes: DataTypes.STRING
      },
      {
        sequelize: connection,
        tableName: 'calendars_class_appointments',
        paranoid: true,
        deletedAt: 'canceledAt'
      }
    )
  }

  static setupAssociations() {
    CalendarClassAppointment.belongsTo(CalendarClass, {
      foreignKey: 'calendarClassId',
      as: 'calendarClass'
    })

    CalendarClassAppointment.belongsTo(CalendarLabel, {
      foreignKey: 'calendarLabelId',
      as: 'calendarLabel'
    })

    CalendarClassAppointment.belongsTo(Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    })
  }
}
