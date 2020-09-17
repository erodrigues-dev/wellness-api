import { Model, DataTypes, Sequelize } from 'sequelize';

import IPackageActivity from '../../models/IPackageActivity';

export default class PackageActivity
  extends Model<IPackageActivity>
  implements IPackageActivity {
  id?: number;
  quantity: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static setup(connection: Sequelize) {
    PackageActivity.init(
      {
        quantity: DataTypes.INTEGER
      },
      { sequelize: connection, tableName: 'package_activities' }
    );
  }

  static setupAssociations() {}
}
