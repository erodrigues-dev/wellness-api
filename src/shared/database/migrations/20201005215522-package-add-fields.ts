import { PackageTypeEnum } from './../../models/enums/PackageTypeEnum';
import { RecurrencyPayEnum } from './../../models/enums/RecurrencyPayEnum';
import { DataTypes, QueryInterface } from 'sequelize';
('use strict');

export default {
  up: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.addColumn('packages', 'recurrency_pay', {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: RecurrencyPayEnum.oneTime
      }),
      queryInterface.addColumn('packages', 'type', {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: PackageTypeEnum.appointments
      }),
      queryInterface.addColumn('packages', 'total', DataTypes.DECIMAL)
    ]);
  },

  down: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('packages', 'recurrency_pay'),
      queryInterface.removeColumn('packages', 'type'),
      queryInterface.removeColumn('packages', 'total')
    ]);
  }
};
