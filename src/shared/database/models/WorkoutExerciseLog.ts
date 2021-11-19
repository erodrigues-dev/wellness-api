import { DataTypes, Model, Sequelize } from 'sequelize';

import WorkoutLog from './WorkoutLog';

export default class WorkoutExerciseLog extends Model {
  id: number;
  workoutLogId: number;
  name: string;
  notes: string;
  set1Reps: number;
  set1Weight: number;
  set2Reps: number;
  set2Weight: number;
  set3Reps: number;
  set3Weight: number;
  set4Reps: number;
  set4Weight: number;

  createdAt: Date;
  updatedAt: Date;

  workoutLog?: WorkoutLog;

  static setup(connection: Sequelize) {
    WorkoutExerciseLog.init(
      {
        name: DataTypes.STRING,
        notes: DataTypes.STRING,
        set1Reps: DataTypes.INTEGER,
        set1Weight: DataTypes.INTEGER,
        set2Reps: DataTypes.INTEGER,
        set2Weight: DataTypes.INTEGER,
        set3Reps: DataTypes.INTEGER,
        set3Weight: DataTypes.INTEGER,
        set4Reps: DataTypes.INTEGER,
        set4Weight: DataTypes.INTEGER
      },
      { sequelize: connection, tableName: 'workout_exercise_logs' }
    );
  }

  static setupAssociations() {
    WorkoutExerciseLog.belongsTo(WorkoutLog, {
      foreignKey: 'workoutLogId',
      as: 'workoutLog'
    });
  }
}
