import { Sequelize, Model, DataTypes } from 'sequelize'

import ICustomer from '../../models/ICustomer'

export default class Customer extends Model<ICustomer> implements ICustomer {
  id?: Number
  name: string
  email: string
  password: string
  imageUrl: string

  readonly createdAt: Date
  readonly updatedAt: Date

  static setup(connection: Sequelize) {
    Customer.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        imageUrl: DataTypes.STRING
      },
      { sequelize: connection, tableName: 'customers' }
    )
  }

  static setupAssociations() {}
}
