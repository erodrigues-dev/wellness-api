import {
  BelongsToManyAddAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManySetAssociationsMixin,
  DataTypes,
  Model,
  Sequelize
} from 'sequelize';
import Employee from './Employee';
import NotificationEmployee from './NotificationEmployee';

export default class Notification extends Model {
  id: number;
  title: string;
  text: string;

  createdBy?: Employee;
  readBy?: Employee[];

  createdById: number;
  createdAt: Date;
  updatedAt: Date;

  setReadBy: BelongsToManySetAssociationsMixin<Employee, number>;
  addReadBy: BelongsToManyAddAssociationsMixin<Employee, number>;
  removeReadBy: BelongsToManyRemoveAssociationMixin<Employee, number>;

  static setup(connection: Sequelize) {
    Notification.init(
      {
        title: DataTypes.STRING,
        text: DataTypes.STRING
      },
      { sequelize: connection, tableName: 'notifications' }
    );
  }

  static setupAssociations() {
    Notification.belongsTo(Employee, {
      foreignKey: 'createdById',
      as: 'createdBy'
    });

    Notification.belongsToMany(Employee, {
      through: NotificationEmployee,
      foreignKey: 'notificationId',
      otherKey: 'employeeId',
      as: 'readBy'
    });
  }
}
