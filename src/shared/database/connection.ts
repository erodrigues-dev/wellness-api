import { Sequelize } from 'sequelize';

import { DB_CONFIG } from '../config/database';
import Activity from './models/Activity';
import ActivitySchedule from './models/ActivitySchedule';
import Category from './models/Category';
import Customer from './models/Customer';
import CustomerDiscount from './models/CustomerDiscount';
import Employee from './models/Employee';
import Functionality from './models/Functionality';
import Order from './models/Order';
import OrderActivity from './models/OrderActivity';
import OrderPackage from './models/OrderPackage';
import Package from './models/Package';
import Profile from './models/Profile';
import Schedule from './models/Schedule';

const connection = new Sequelize(DB_CONFIG);

export function databaseConfig() {
  Activity.setup(connection);
  Employee.setup(connection);
  ActivitySchedule.setup(connection);
  Customer.setup(connection);
  Functionality.setup(connection);
  Package.setup(connection);
  Profile.setup(connection);
  Category.setup(connection);
  CustomerDiscount.setup(connection);
  Order.setup(connection);
  Schedule.setup(connection);
  OrderPackage.setup(connection);
  OrderActivity.setup(connection);

  Activity.setupAssociations();
  ActivitySchedule.setupAssociations();
  Customer.setupAssociations();
  Employee.setupAssociations();
  Functionality.setupAssociations();
  Package.setupAssociations();
  Profile.setupAssociations();
  Category.setupAssociations();
  CustomerDiscount.setupAssociations();
  Order.setupAssociations();
  OrderPackage.setupAssociations();
  OrderActivity.setupAssociations();
  Schedule.setupAssociations();
}

export default connection;
