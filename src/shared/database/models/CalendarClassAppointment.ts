import { DataTypes, Model, Sequelize } from 'sequelize'
import CalendarClass from './CalendarClass'
import Customer from './Customer'

export default class CalendarClassAppointment extends Model {
  id: string
  calendarClassId: string
  customerId: number
  dateStart: Date
  dateEnd: Date
  notes: string

  calendarClass?: CalendarClass
  customer?: Customer

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
        deletedAt: 'canceled_at'
      }
    )
  }

  static setupAssociations() {
    CalendarClassAppointment.belongsTo(CalendarClass, {
      foreignKey: 'calendarClassId',
      as: 'calendarClass'
    })

    CalendarClassAppointment.belongsTo(Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    })
  }
}
