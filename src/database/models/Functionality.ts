import { Model, DataTypes, Association } from 'sequelize'

import { sequelize } from '../db'
import { IFunctionality } from '../../shared/models/IFunctionality'
import { Profile } from './Profile'

export class Functionality
  extends Model<IFunctionality>
  implements IFunctionality {
  id?: number
  name: string
  actions: number

  readonly createdAt: Date
  readonly updatedAt: Date

  static associations: {
    profiles: Association<Functionality, Profile>
  }
}

export function init() {
  Functionality.init(
    { name: DataTypes.STRING, actions: DataTypes.INTEGER },
    { sequelize, tableName: 'functionalities' }
  )
}

export function associate() {
  Functionality.belongsTo(Profile, {
    foreignKey: 'profileId',
    as: 'profile'
  })
}
