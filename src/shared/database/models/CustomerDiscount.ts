import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import { DiscountTypeEnum } from '../../models/enums/DiscountTypeEnum';
import Customer from './Customer';
import Employee from './Employee';

export default class CustomerDiscount extends Model {
  id: number;

  relationType: string;
  relationId: number;

  type: DiscountTypeEnum;
  value: number;

  customerId: number;
  userId: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    customer: Association<CustomerDiscount, Customer>;
    user: Association<CustomerDiscount, Employee>;
  };

  static setup(connection: Sequelize) {
    CustomerDiscount.init(
      {
        relationType: DataTypes.STRING,
        relationId: DataTypes.INTEGER,
        type: DataTypes.STRING,
        value: DataTypes.DECIMAL
      },
      { sequelize: connection, tableName: 'customer_discounts' }
    );
  }

  static setupAssociations() {
    CustomerDiscount.belongsTo(Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });

    CustomerDiscount.belongsTo(Employee, {
      foreignKey: 'userId',
      as: 'user'
    });
  }
}
