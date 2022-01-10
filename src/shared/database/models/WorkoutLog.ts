import { BelongsToManySetAssociationsMixin, DataTypes, Model, Sequelize } from 'sequelize';
import Employee from './Employee';

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
  trainers?: Employee[];

  setTrainers: BelongsToManySetAssociationsMixin<Employee, number>;

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

    WorkoutLog.belongsToMany(Employee, {
      through: 'workout_log_trainers',
      as: 'trainers',
      otherKey: 'trainer_id',
      foreignKey: 'workout_log_id',
      timestamps: false
    });
  }
}
