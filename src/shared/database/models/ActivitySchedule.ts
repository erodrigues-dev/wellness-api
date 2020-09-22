import { FrequencyEnum } from './../../models/enums/FrequencyEnum';
import { EndsInEnum } from './../../models/enums/EndsInEnum';
import { Sequelize, Model, DataTypes, Association } from 'sequelize';

import IActivitySchedule from '../../models/IActivitySchedule';
import Activity from './Activity';

export default class ActivitySchedule
  extends Model<IActivitySchedule>
  implements IActivitySchedule {
  id?: number;
  activityId: number;
  title: string;
  color: string;
  date: Date;
  start: string;
  end: string;

  recurrent: boolean;
  recurrentRepeatEvery?: number;
  recurrentFrequency?: FrequencyEnum;
  recurrentWeekdays?: string;
  recurrentEndsIn?: EndsInEnum;
  recurrentUntil?: Date;
  recurrentOcurrences?: number;

  activity?: Activity;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    activity: Association<ActivitySchedule, Activity>;
  };

  static setup(connection: Sequelize) {
    ActivitySchedule.init(
      {
        title: DataTypes.STRING,
        color: DataTypes.STRING,
        date: DataTypes.DATEONLY,
        start: DataTypes.TIME,
        end: DataTypes.TIME,
        recurrent: DataTypes.BOOLEAN,
        recurrentRepeatEvery: DataTypes.INTEGER,
        recurrentFrequency: DataTypes.STRING,
        recurrentWeekdays: DataTypes.STRING,
        recurrentEndsIn: DataTypes.STRING,
        recurrentUntil: DataTypes.DATEONLY,
        recurrentOcurrences: DataTypes.INTEGER
      },
      { sequelize: connection, tableName: 'activities_schedules' }
    );
  }

  static setupAssociations() {
    ActivitySchedule.belongsTo(Activity, {
      foreignKey: 'activityId',
      as: 'activity'
    });
  }
}
