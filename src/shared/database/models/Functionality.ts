import { Model, DataTypes, Association, Sequelize } from 'sequelize'

import IFunctionality from '../../models/IFunctionality'
import Profile from './Profile'

export default class Functionality
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

  static setup(connection: Sequelize) {
    Functionality.init(
      { name: DataTypes.STRING, actions: DataTypes.INTEGER },
      { sequelize: connection, tableName: 'functionalities' }
    )
  }

  static setupAssociations() {
    Functionality.belongsTo(Profile, {
      foreignKey: 'profileId',
      as: 'profile'
    })
  }
}
