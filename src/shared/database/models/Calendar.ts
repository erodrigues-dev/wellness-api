import { BelongsToManySetAssociationsMixin, DataTypes, Model, Sequelize } from 'sequelize';
import Activity from './Activity';
import Category from './Category';

export default class Calendar extends Model {
  id: string;
  name: string;
  categoryId: number;
  minHoursToSchedule: number;
  minHoursToCancel: number;
  maxDaysInFuture: number;
  maxEntryPerSlot: number;

  createdAt: Date;
  updatedAt: Date;

  category?: Category;
  activities?: Activity[];

  setActivities: BelongsToManySetAssociationsMixin<Activity, number>;

  static setup(connection: Sequelize) {
    Calendar.init(
      {
        name: DataTypes.STRING,
        minHoursToSchedule: DataTypes.INTEGER,
        minHoursToCancel: DataTypes.INTEGER,
        maxDaysInFuture: DataTypes.INTEGER,
        maxEntryPerSlot: DataTypes.INTEGER
      },
      { sequelize: connection, tableName: 'calendars', paranoid: true }
    );
  }

  static setupAssociations() {
    Calendar.belongsTo(Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });

    Calendar.belongsToMany(Activity, {
      through: 'calendars_activities',
      as: 'activities',
      foreignKey: 'calendar_id',
      otherKey: 'activity_id',
      timestamps: false
    });
  }
}
