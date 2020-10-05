import { RecurrencyPayEnum } from './../../models/enums/RecurrencyPayEnum';
import { PackageTypeEnum } from './../../models/enums/PackageTypeEnum';
import {
  Model,
  DataTypes,
  Association,
  Sequelize,
  BelongsToManyAddAssociationMixin,
  BelongsToManySetAssociationsMixin
} from 'sequelize';

import Activity from './Activity';
import Category from './Category';

export default class Package extends Model {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  expiration?: Date;
  showInApp: boolean;
  showInWeb: boolean;
  categoryId: number;

  recurrencyPay: RecurrencyPayEnum;
  type: PackageTypeEnum;
  total?: number;

  activities?: Activity[];
  category?: Category;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  addActivity: BelongsToManyAddAssociationMixin<Activity, number>;
  setActivities: BelongsToManySetAssociationsMixin<Activity, number>;

  static associations: {
    activities: Association<Package, Activity>;
    category: Association<Package, Category>;
  };

  static setup(connection: Sequelize) {
    Package.init(
      {
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        description: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        expiration: DataTypes.DATE,
        showInApp: DataTypes.BOOLEAN,
        showInWeb: DataTypes.BOOLEAN,
        categoryId: DataTypes.INTEGER,
        recurrencyPay: DataTypes.ENUM(...Object.values(RecurrencyPayEnum)),
        type: DataTypes.ENUM(...Object.values(PackageTypeEnum)),
        total: DataTypes.DECIMAL
      },
      { sequelize: connection, tableName: 'packages' }
    );

    //through table m:m
    connection.define(
      'PackageActivity',
      {
        quantity: DataTypes.NUMBER
      },
      { tableName: 'package_activities' }
    );
  }

  static setupAssociations() {
    Package.belongsToMany(Activity, {
      through: 'PackageActivity',
      as: 'activities'
    });

    Package.belongsTo(Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
  }
}
