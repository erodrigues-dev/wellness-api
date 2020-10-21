import { Sequelize } from 'sequelize';

import { DB_CONFIG } from '../config/database';

import Activity from './models/Activity';
import ActivitySchedule from './models/ActivitySchedule';
import Customer from './models/Customer';
import Employee from './models/Employee';
import Functionality from './models/Functionality';
import Package from './models/Package';
import Profile from './models/Profile';
import CustomPackage from './models/CustomPackage';
import Category from './models/Category';
import CustomerDiscount from './models/CustomerDiscount';

const connection = new Sequelize(DB_CONFIG);

export function databaseConfig() {
  Activity.setup(connection);
  ActivitySchedule.setup(connection);
  Customer.setup(connection);
  Employee.setup(connection);
  Functionality.setup(connection);
  Package.setup(connection);
  Profile.setup(connection);
  CustomPackage.setup(connection);
  Category.setup(connection);
  CustomerDiscount.setup(connection);

  Activity.setupAssociations();
  ActivitySchedule.setupAssociations();
  Customer.setupAssociations();
  Employee.setupAssociations();
  Functionality.setupAssociations();
  Package.setupAssociations();
  Profile.setupAssociations();
  CustomPackage.setupAssociations();
  Category.setupAssociations();
  CustomerDiscount.setupAssociations();
}

export default connection;
