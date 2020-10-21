import { DataTypes, QueryInterface } from 'sequelize';
('use strict');

export default {
  up: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.addColumn('packages', 'recurrency_pay', {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'one-time'
      }),
      queryInterface.addColumn('packages', 'type', {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'appointments'
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
