import { Model, DataTypes, Association } from 'sequelize'

import { sequelize } from '../db'
import { Employee } from './Employee'
import { IActivity } from '../../shared/models/IActivity'
import { Package } from './Package'
import { PackageActivity } from './PackageActivity'
import { IEmployee } from '../../shared/models/IEmployee'
import { IPackage } from '../../shared/models/IPackage'

export class Activity extends Model<IActivity> implements IActivity {
  id?: number
  name: string
  description: string
  price: number
  duration: number
  imageUrl: string

  employee: IEmployee
  packages: IPackage[]

  readonly createdAt: Date
  readonly updatedAt: Date

  static associations: {
    employee: Association<Activity, Employee>
    packages: Association<Activity, Package>
  }
}

export function init() {
  Activity.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      duration: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING
    },
    { sequelize, tableName: 'activities' }
  )
}
export function associate() {
  Activity.belongsToMany(Package, {
    through: PackageActivity,
    as: 'packages'
  })

  Activity.belongsTo(Employee, {
    foreignKey: 'employeeId',
    as: 'employee'
  })
}
