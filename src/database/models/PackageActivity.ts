import { Model, DataTypes } from 'sequelize'

import { sequelize } from '../db'
import { IPackageActivity } from '../../shared/models/IPackageActivity'

export class PackageActivity
  extends Model<IPackageActivity>
  implements IPackageActivity {
  id?: number
  quantity: number

  readonly createdAt: Date
  readonly updatedAt: Date
}

export function init() {
  PackageActivity.init(
    {
      quantity: DataTypes.INTEGER
    },
    { sequelize, tableName: 'package_activities' }
  )
}

export function associate() {}
