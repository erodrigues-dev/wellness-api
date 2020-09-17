import { Model, DataTypes, Association, Sequelize } from 'sequelize';

import connection from '../connection';
import Activity from './Activity';
import PackageActivity from './PackageActivity';

import IPackage from '../../models/IPackage';

export default class Package extends Model<IPackage> implements IPackage {
  id?: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  expiration: Date;
  showInApp: boolean;
  showInWeb: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    activities: Association<Package, Activity>;
  };

  static setup(connection: Sequelize) {
    Package.init(
      {
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        description: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        expiration: DataTypes.DATE,
        showInApp: DataTypes.BOOLEAN
      },
      { sequelize: connection, tableName: 'packages' }
    );
  }

  static setupAssociations() {
    Package.belongsToMany(Activity, {
      through: PackageActivity,
      as: 'activities'
    });
  }
}
