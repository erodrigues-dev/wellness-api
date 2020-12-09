import { DataTypes, QueryInterface } from 'sequelize';

('use strict');

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn(
      'order_payments',
      'paid_until_date',
      DataTypes.DATE
    );
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn('order_payments', 'paid_until_date');
  }
};
