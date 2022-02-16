import { Sequelize } from 'sequelize'

import { DB_CONFIG } from '../config/database'

import Activity from './models/Activity'
import Category from './models/Category'
import Customer from './models/Customer'
import CustomerDiscount from './models/CustomerDiscount'
import EmailConfirmationCode from './models/EmailConfirmationCode'
import Employee from './models/Employee'
import Order from './models/Order'
import OrderActivity from './models/OrderActivity'
import OrderPackage from './models/OrderPackage'
import Package from './models/Package'
import Profile from './models/Profile'
import Specialty from './models/Specialty'
import Waiver from './models/Waiver'
import CustomerWaiver from './models/CustomerWaiver'
import WorkoutProfile from './models/WorkoutProfile'
import WorkoutLog from './models/WorkoutLog'
import WorkoutExerciseLog from './models/WorkoutExerciseLog'
import ActivityEmployee from './models/ActivityEmployee'
import Notification from './models/Notification'
import NotificationEmployee from './models/NotificationEmployee'
import Calendar from './models/Calendar'
import TeamGroup from './models/TeamGroup'
import CalendarSlot from './models/CalendarSlot'
import CalendarEntry from './models/CalendarEntry'
import CalendarLabel from './models/CalendarLabel'
import CalendarClass from './models/CalendarClass'

const connection = new Sequelize(DB_CONFIG)

export function databaseConfig() {
  Activity.setup(connection)
  Employee.setup(connection)
  Customer.setup(connection)
  Package.setup(connection)
  Profile.setup(connection)
  Category.setup(connection)
  CustomerDiscount.setup(connection)
  Order.setup(connection)
  OrderPackage.setup(connection)
  OrderActivity.setup(connection)
  EmailConfirmationCode.setup(connection)
  Specialty.setup(connection)
  Waiver.setup(connection)
  CustomerWaiver.setup(connection)
  WorkoutProfile.setup(connection)
  WorkoutLog.setup(connection)
  WorkoutExerciseLog.setup(connection)
  ActivityEmployee.setup(connection)
  Notification.setup(connection)
  NotificationEmployee.setup(connection)
  Calendar.setup(connection)
  TeamGroup.setup(connection)
  CalendarSlot.setup(connection)
  CalendarEntry.setup(connection)
  CalendarLabel.setup(connection)
  CalendarClass.setup(connection)

  Activity.setupAssociations()
  Customer.setupAssociations()
  Employee.setupAssociations()
  Package.setupAssociations()
  Profile.setupAssociations()
  Category.setupAssociations()
  CustomerDiscount.setupAssociations()
  Order.setupAssociations()
  OrderPackage.setupAssociations()
  OrderActivity.setupAssociations()
  EmailConfirmationCode.setupAssociations()
  CustomerWaiver.setupAssociations()
  WorkoutProfile.setupAssociations()
  WorkoutLog.setupAssociations()
  WorkoutExerciseLog.setupAssociations()
  Notification.setupAssociations()
  Calendar.setupAssociations()
  TeamGroup.setupAssociations()
  CalendarSlot.setupAssociations()
  CalendarEntry.setupAssociations()
  CalendarClass.setupAssociations()
}

export default connection
