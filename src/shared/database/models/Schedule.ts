import { DataTypes, Model, Sequelize } from 'sequelize';

import { ScheduleStatusEnum } from '../../models/enums/ScheduleStatusEnum';
import ActivitySchedule from './ActivitySchedule';
import Customer from './Customer';

export default class Schedule extends Model {
  id: number;
  customerId: number;
  activityScheduleId: number;
  status: ScheduleStatusEnum;
  date: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  customer?: Customer;
  activitySchedule?: ActivitySchedule;

  static setup(connection: Sequelize) {
    Schedule.init(
      {
        customerId: DataTypes.INTEGER,
        activityScheduleId: DataTypes.INTEGER,
        status: DataTypes.STRING,
        date: DataTypes.DATEONLY
      },
      {
        sequelize: connection,
        tableName: 'schedules'
      }
    );
  }

  static setupAssociations() {
    Schedule.belongsTo(Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });

    Schedule.belongsTo(ActivitySchedule, {
      foreignKey: 'activityScheduleId',
      as: 'activitySchedule'
    });
  }
}
