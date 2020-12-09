import {
    Association, BelongsToManyAddAssociationMixin, BelongsToManySetAssociationsMixin, DataTypes,
    Model, Sequelize
} from 'sequelize';

import ICustomPackage from '../../models/entities/ICustomPackage';
import Activity from './Activity';
import Customer from './Customer';

export default class CustomPackage extends Model<ICustomPackage> {
  id: number;
  customerId: number;
  name: string;
  price: number;
  description: string;
  expiration?: Date;

  customer?: Customer;
  activities: Activity[];

  readonly createdAt: Date;
  readonly updatedAt: Date;

  addActivity: BelongsToManyAddAssociationMixin<Activity, number>;
  setActivities: BelongsToManySetAssociationsMixin<Activity, number>;

  static associations: {
    customer: Association<CustomPackage, Customer>;
    activities: Association<CustomPackage, Activity>;
  };

  static setup(connection: Sequelize) {
    CustomPackage.init(
      {
        customerId: DataTypes.NUMBER,
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        description: DataTypes.STRING,
        expiration: DataTypes.DATE
      },
      { sequelize: connection, tableName: 'custom_packages' }
    );

    // through table m:m
    connection.define(
      'CustomPackageActivity',
      {
        quantity: DataTypes.NUMBER
      },
      {
        tableName: 'custom_packages_activities'
      }
    );
  }

  static setupAssociations() {
    CustomPackage.belongsToMany(Activity, {
      through: 'CustomPackageActivity',
      as: 'activities'
    });

    CustomPackage.belongsTo(Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });
  }
}
