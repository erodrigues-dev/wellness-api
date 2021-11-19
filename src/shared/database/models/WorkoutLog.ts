import { DataTypes, Model, Sequelize } from 'sequelize';

import WorkoutProfile from './WorkoutProfile';

export default class WorkoutLog extends Model {
  id: number;
  workoutProfileId: number;
  resume: string;
  notes: string;
  date: Date;

  createdAt: Date;
  updatedAt: Date;

  workoutProfile?: WorkoutProfile;

  static setup(connection: Sequelize) {
    WorkoutLog.init(
      {
        resume: DataTypes.STRING,
        notes: DataTypes.STRING,
        date: DataTypes.DATE
      },
      { sequelize: connection, tableName: 'workout_logs' }
    );
  }

  static setupAssociations() {
    WorkoutLog.belongsTo(WorkoutProfile, {
      foreignKey: 'workoutProfileId',
      as: 'workoutProfile'
    });
  }
}
