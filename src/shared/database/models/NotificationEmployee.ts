import { DataTypes, Model, Sequelize } from 'sequelize';

export default class NotificationEmployee extends Model {
  id: number;

  notificationId: number;
  employeeId: number;

  createdAt: Date;
  updatedAt: Date;

  static setup(connection: Sequelize) {
    NotificationEmployee.init({}, { sequelize: connection, tableName: 'notification_employees' });
  }
}
