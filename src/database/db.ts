import { Sequelize } from 'sequelize'

import { DB_CONFIG } from '../config/database'

import {
  init as EmployeeInit,
  associate as EmployeeAssociate
} from './models/Employee'
import {
  init as FunctionalityInit,
  associate as FunctionalityAssociate
} from './models/Functionality'
import {
  init as ProfileInit,
  associate as ProfileAssociate
} from './models/Profile'
import {
  init as ActivityInit,
  associate as ActivityAssociate
} from './models/Activity'
import {
  init as CustomerInit,
  associate as CustomerAssociate
} from './models/Customer'
import {
  init as PackageInit,
  associate as PackageAssociate
} from './models/Package'
import {
  init as PackageActivityInit,
  associate as PackageActivityAssociate
} from './models/PackageActivity'

console.log('>> create sequelize isntance')
export const sequelize = new Sequelize(DB_CONFIG)

export function databaseConfig() {
  console.log('>> initialize models')
  ActivityInit()
  CustomerInit()
  EmployeeInit()
  FunctionalityInit()
  PackageInit()
  PackageActivityInit()
  ProfileInit()

  console.log('>> associate models')
  ActivityAssociate()
  CustomerAssociate()
  EmployeeAssociate()
  FunctionalityAssociate()
  PackageActivityAssociate()
  PackageAssociate()
  ProfileAssociate()
}
