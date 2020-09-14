import { Model, DataTypes } from 'sequelize'

import { sequelize } from '../db'
import { ICustomer } from '../../shared/models/ICustomer'

export class Customer extends Model<ICustomer> implements ICustomer {
  id?: Number
  name: string
  email: string
  password: string
  imageUrl: string

  readonly createdAt: Date
  readonly updatedAt: Date
}

export function init() {
  Customer.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      imageUrl: DataTypes.STRING
    },
    { sequelize, tableName: 'customers' }
  )
}

export function associate() {}
