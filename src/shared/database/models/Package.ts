import {
  Model,
  DataTypes,
  Association,
  Sequelize,
  HasManyAddAssociationMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManySetAssociationsMixin
} from 'sequelize';

import Activity from './Activity';
import PackageActivity from './PackageActivity';

import IPackage from '../../models/IPackage';

export default class Package extends Model<IPackage> implements IPackage {
  id?: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  expiration?: Date;
  showInApp: boolean;
  showInWeb: boolean;

  activities?: Activity[];

  readonly createdAt: Date;
  readonly updatedAt: Date;

  addActivity: BelongsToManyAddAssociationMixin<Package, number>;
  setActivities: BelongsToManySetAssociationsMixin<Package, number>;

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
