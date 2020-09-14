import { Model, DataTypes, Association } from 'sequelize'

import { sequelize } from '../db'
import { Employee } from './Employee'
import { IEmployee } from '../../shared/models/IEmployee'
import { Functionality } from './Functionality'
import { IProfile } from '../../shared/models/IProfile'

export class Profile extends Model<IProfile> implements IProfile {
  id?: number
  name: string
  description: string

  functionalities: Functionality[]
  employees: IEmployee[]

  readonly createdAt: Date
  readonly updatedAt: Date

  static associations: {
    employees: Association<Profile, Employee>
    functionalities: Association<Profile, Functionality>
  }
}

export function init() {
  Profile.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.INTEGER
    },
    {
      sequelize,
      tableName: 'profiles'
    }
  )
}

export function associate() {
  Profile.hasMany(Employee, {
    foreignKey: 'profileId',
    as: 'employees'
  })

  Profile.hasMany(Functionality, {
    foreignKey: 'profileId',
    as: 'functionalities'
  })
}
