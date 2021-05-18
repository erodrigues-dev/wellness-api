import { DataTypes, Model, Sequelize } from 'sequelize';
import Customer from './Customer';
import Waiver from './Waiver';

export default class CustomerWaiver extends Model {
  id: number;
  customerId: number;
  waiverId: number;
  signedUrl: string;
  signedAt?: Date;

  createdAt: Date;
  updatedAt?: Date;

  waiver?: Waiver;
  customer?: Customer;

  static setup(connection: Sequelize) {
    CustomerWaiver.init(
      {
        signedUrl: DataTypes.STRING,
        signedAt: DataTypes.DATE
      },
      { sequelize: connection, tableName: 'customer_waivers' }
    );
  }

  static setupAssociations() {
    CustomerWaiver.belongsTo(Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });

    CustomerWaiver.belongsTo(Waiver, {
      foreignKey: 'waiverId',
      as: 'waiver'
    });
  }
}
