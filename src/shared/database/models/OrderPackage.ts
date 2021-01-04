import { DataTypes, Model, Sequelize } from 'sequelize';

import { PackageTypeEnum } from '../../models/enums/PackageTypeEnum';
import { RecurrencyPayEnum } from '../../models/enums/RecurrencyPayEnum';
import Category from './Category';
import Order from './Order';
import OrderActivity from './OrderActivity';
import Package from './Package';

export default class OrderPackage extends Model {
  id: number;
  orderId: number;
  packageId: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
  recurrencyPay: RecurrencyPayEnum;
  type: PackageTypeEnum;
  total: number;
  squareId: string;
  expiration?: Date;

  readonly createdAt: Date;
  readonly updatedAt?: Date;

  order?: Order;
  package?: Package;
  category?: Category;
  orderActivities?: OrderActivity[];

  static setup(connection: Sequelize) {
    OrderPackage.init(
      {
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        description: DataTypes.STRING,
        recurrencyPay: DataTypes.STRING,
        type: DataTypes.STRING,
        total: DataTypes.DECIMAL,
        squareId: DataTypes.STRING,
        expiration: DataTypes.DATE
      },
      { sequelize: connection, tableName: 'order_packages' }
    );
  }

  static setupAssociations() {
    OrderPackage.belongsTo(Order, {
      foreignKey: 'orderId',
      as: 'order'
    });

    OrderPackage.belongsTo(Package, {
      foreignKey: 'packageId',
      as: 'package'
    });

    OrderPackage.belongsTo(Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });

    OrderPackage.hasMany(OrderActivity, {
      foreignKey: 'orderPackageId',
      as: 'orderActivities'
    });
  }
}
