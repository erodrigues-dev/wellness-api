import { QueryInterface } from 'sequelize';

('use strict');

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.renameColumn('orders', 'amount', 'total');
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.renameColumn('orders', 'total', 'amount');
  }
};
