import { DataTypes, fn, QueryInterface } from 'sequelize';

('use strict');

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn('order_payments', 'status_date', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: fn('now')
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn('order_payments', 'status_date');
  }
};
