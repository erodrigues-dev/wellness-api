import { BelongsToManySetAssociationsMixin, DataTypes, Model, Sequelize } from 'sequelize';
import Employee from './Employee';

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

  static setup(connection: Sequelize) {
    Notification.init(
      {
        title: DataTypes.STRING,
        text: DataTypes.STRING
      },
      { sequelize: connection }
    );
  }

  static setupAssociations() {
    Notification.belongsTo(Employee, {
      foreignKey: 'createdById',
      as: 'createdBy'
    });

    Notification.belongsToMany(Employee, {
      through: 'notification_read_by_employees',
      as: 'readBy'
    });
  }
}
