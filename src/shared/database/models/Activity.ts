import { Sequelize, Model, DataTypes, Association } from 'sequelize'

import Employee from './Employee'
import PackageActivity from './PackageActivity'
import Package from './Package'

import IActivity from '../../models/IActivity'
import IEmployee from '../../models/IEmployee'
import IPackage from '../../models/IPackage'

export default class Activity extends Model<IActivity> implements IActivity {
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

  static setup(connection: Sequelize) {
    Activity.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        duration: DataTypes.INTEGER,
        imageUrl: DataTypes.STRING
      },
      { sequelize: connection, tableName: 'activities' }
    )
  }

  static setupAssociations() {
    Activity.belongsToMany(Package, {
      through: PackageActivity,
      as: 'packages'
    })

    Activity.belongsTo(Employee, {
      foreignKey: 'employeeId',
      as: 'employee'
    })
  }
}
