import { Model, Sequelize } from 'sequelize';

export default class ActivityEmployee extends Model {
  id: number;
  activityId: number;
  employeeId: number;

  createdAt: Date;
  updatedAt: Date;

  static setup(connection: Sequelize) {
    ActivityEmployee.init(
      {},
      {
        sequelize: connection,
        tableName: 'activity_employees'
      }
    );
  }
}
