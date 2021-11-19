import { Sequelize } from 'sequelize';

import { DB_CONFIG } from '../config/database';

import Activity from './models/Activity';
import Category from './models/Category';
import Customer from './models/Customer';
import CustomerDiscount from './models/CustomerDiscount';
import EmailConfirmationCode from './models/EmailConfirmationCode';
import Employee from './models/Employee';
import Event from './models/Event';
import Order from './models/Order';
import OrderActivity from './models/OrderActivity';
import OrderPackage from './models/OrderPackage';
import Package from './models/Package';
import Profile from './models/Profile';
import Schedule from './models/Schedule';
import Specialty from './models/Specialty';
import Waiver from './models/Waiver';
import CustomerWaiver from './models/CustomerWaiver';
import WorkoutProfile from './models/WorkoutProfile';
import WorkoutLog from './models/WorkoutLog';
import WorkoutExerciseLog from './models/WorkoutExerciseLog';
import ActivityEmployee from './models/ActivityEmployee';
import Notification from './models/Notification';
import NotificationEmployee from './models/NotificationEmployee';
import Calendar from './models/Calendar';
import CalendarAvailability from './models/CalendarAvailability';

const connection = new Sequelize(DB_CONFIG);

export function databaseConfig() {
  Activity.setup(connection);
  Employee.setup(connection);
  Event.setup(connection);
  Customer.setup(connection);
  Package.setup(connection);
  Profile.setup(connection);
  Category.setup(connection);
  CustomerDiscount.setup(connection);
  Order.setup(connection);
  Schedule.setup(connection);
  OrderPackage.setup(connection);
  OrderActivity.setup(connection);
  EmailConfirmationCode.setup(connection);
  Specialty.setup(connection);
  Waiver.setup(connection);
  CustomerWaiver.setup(connection);
  WorkoutProfile.setup(connection);
  WorkoutLog.setup(connection);
  WorkoutExerciseLog.setup(connection);
  ActivityEmployee.setup(connection);
  Notification.setup(connection);
  NotificationEmployee.setup(connection);
  Calendar.setup(connection);
  CalendarAvailability.setup(connection);

  Activity.setupAssociations();
  Event.setupAssociations();
  Customer.setupAssociations();
  Employee.setupAssociations();
  Package.setupAssociations();
  Profile.setupAssociations();
  Category.setupAssociations();
  CustomerDiscount.setupAssociations();
  Order.setupAssociations();
  OrderPackage.setupAssociations();
  OrderActivity.setupAssociations();
  Schedule.setupAssociations();
  EmailConfirmationCode.setupAssociations();
  CustomerWaiver.setupAssociations();
  WorkoutProfile.setupAssociations();
  WorkoutLog.setupAssociations();
  WorkoutExerciseLog.setupAssociations();
  Notification.setupAssociations();
  Calendar.setupAssociations();
  CalendarAvailability.setupAssociations();
}

export default connection;
