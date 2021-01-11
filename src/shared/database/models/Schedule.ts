import { DataTypes, Model, Sequelize } from 'sequelize';
import { ScheduleStatusEnum } from '../../models/enums/ScheduleStatusEnum';

import ActivitySchedule from './ActivitySchedule';
import Customer from './Customer';
import OrderActivity from './OrderActivity';

export default class Schedule extends Model {
  id: number;
  customerId: number;
  orderActivityId: number;
  activityScheduleId: number;
  title: string;
  date: string;
  start: string;
  end: string;
  status: ScheduleStatusEnum;
  attenderId?: number;

  readonly createdAt: Date;
  readonly updatedAt?: Date;

  customer?: Customer;
  orderActivity?: OrderActivity;
  activitySchedule?: ActivitySchedule;

  static setup(connection: Sequelize) {
    Schedule.init(
      {
        title: DataTypes.STRING,
        date: DataTypes.DATEONLY,
        start: DataTypes.STRING,
        end: DataTypes.STRING,
        status: DataTypes.STRING
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

    Schedule.belongsTo(OrderActivity, {
      foreignKey: 'orderActivityId',
      as: 'orderActivity'
    });
  }
}
