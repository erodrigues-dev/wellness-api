import { DataTypes, Model, Sequelize } from 'sequelize';
import Category from './Category';

export default class Calendar extends Model {
  id: number;
  name: string;
  categoryId: number;
  minHoursToSchedule: number;
  minHoursToCancel: number;
  maxDaysInFuture: number;
  maxEntryPerSlot: number;

  createdAt: Date;
  updatedAt: Date;

  category?: Category;

  static setup(connection: Sequelize) {
    Calendar.init(
      {
        name: DataTypes.STRING,
        minHoursToSchedule: DataTypes.INTEGER,
        minHoursToCancel: DataTypes.INTEGER,
        maxDaysInFuture: DataTypes.INTEGER,
        maxEntryPerSlot: DataTypes.INTEGER
      },
      { sequelize: connection, tableName: 'calendars' }
    );
  }

  static setupAssociations() {
    Calendar.belongsTo(Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
  }
}
