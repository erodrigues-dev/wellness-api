import { Model, DataTypes, Association } from 'sequelize'

import { sequelize } from '../db'
import { Activity } from './Activity'
import { PackageActivity } from './PackageActivity'
import { IPackage } from '../../shared/models/IPackage'

export class Package extends Model<IPackage> implements IPackage {
  id?: number
  name: string
  price: number
  description: string
  imageUrl: string
  expiration: Date
  showInApp: boolean
  showInWeb: boolean

  readonly createdAt: Date
  readonly updatedAt: Date

  static associations: {
    activities: Association<Package, Activity>
  }
}

export function init() {
  Package.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      expiration: DataTypes.DATE,
      showInApp: DataTypes.BOOLEAN
    },
    { sequelize, tableName: 'packages' }
  )
}

export function associate() {
  Package.belongsToMany(Activity, {
    through: PackageActivity,
    as: 'activities'
  })
}
