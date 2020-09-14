import { Model, DataTypes, Association } from 'sequelize'

import { Profile } from './Profile'
import { IProfile } from '../../shared/models/IProfile'
import { sequelize } from '../db'
import { IEmployee } from '../../shared/models/IEmployee'

export class Employee extends Model<IEmployee> implements IEmployee {
  id?: number
  name: string
  email: string
  password: string
  specialty: string
  imageUrl: string

  profile: IProfile

  readonly createdAt: Date
  readonly updatedAt: Date

  static associations: {
    profile: Association<Employee, Profile>
  }
}

export function init() {
  Employee.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      specialty: DataTypes.STRING,
      imageUrl: DataTypes.STRING
    },
    {
      sequelize,
      tableName: 'employees'
    }
  )
}

export function associate() {
  Employee.belongsTo(Profile, {
    foreignKey: 'profileId',
    as: 'profile'
  })
}
