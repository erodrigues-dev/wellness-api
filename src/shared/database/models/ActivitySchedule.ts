import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import IActivitySchedule from '../../models/entities/IActivitySchedule';
import { EndsInEnum } from '../../models/enums/EndsInEnum';
import { FrequencyEnum } from '../../models/enums/FrequencyEnum';
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
  repeatEvery?: number;
  frequency?: FrequencyEnum;
  weekdays?: string;
  endsIn?: EndsInEnum;
  until?: Date;
  ocurrences?: number;

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
        repeatEvery: DataTypes.INTEGER,
        frequency: DataTypes.STRING,
        weekdays: DataTypes.STRING,
        endsIn: DataTypes.STRING,
        until: DataTypes.DATEONLY,
        ocurrences: DataTypes.INTEGER,
        activityId: DataTypes.INTEGER
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
