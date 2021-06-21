import { DataTypes, Model, Sequelize } from 'sequelize';
import Customer from './Customer';

export default class WorkoutProfile extends Model {
  id: number;
  customerId: number;
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

  static setup(connection: Sequelize) {
    WorkoutProfile.init(
      {
        customerId: DataTypes.INTEGER,
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
      foreignKey: 'customer_id',
      as: 'customer'
    });
  }
}
