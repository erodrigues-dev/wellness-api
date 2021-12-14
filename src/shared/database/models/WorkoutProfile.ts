import { DataTypes, Model, Sequelize } from 'sequelize';
import Customer from './Customer';
import TeamGroup from './TeamGroup';

export default class WorkoutProfile extends Model {
  id: number;
  customerId?: number;
  teamGroupId?: string;
  age: number;
  height: string;
  weight: number;
  goal: string;
  test1: string;
  test2: string;
  injuriesLimitations: string;
  experienceLevel: string;
  notes: string;

  createdAt: Date;
  updatedAt: Date;

  customer?: Customer;
  teamGroup?: TeamGroup;

  static setup(connection: Sequelize) {
    WorkoutProfile.init(
      {
        age: DataTypes.INTEGER,
        height: DataTypes.STRING,
        weight: DataTypes.INTEGER,
        goal: DataTypes.STRING,
        test1: DataTypes.STRING,
        test2: DataTypes.STRING,
        injuriesLimitations: DataTypes.STRING,
        experienceLevel: DataTypes.STRING,
        notes: DataTypes.STRING
      },
      { sequelize: connection, tableName: 'workout_profiles' }
    );
  }

  static setupAssociations() {
    WorkoutProfile.belongsTo(Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });

    WorkoutProfile.belongsTo(TeamGroup, {
      foreignKey: 'teamGroupId',
      as: 'teamGroup'
    });
  }
}
