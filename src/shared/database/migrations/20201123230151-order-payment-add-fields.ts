import { DataTypes, fn, QueryInterface } from 'sequelize';

('use strict');

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.addColumn('order_payments', 'transaction_id', {
        type: DataTypes.STRING(255),
        comment: 'paymentId|subscriptionId'
      }),
      queryInterface.addColumn('order_payments', 'recurrency', {
        type: DataTypes.STRING(50),
        comment: 'one-time|weekly|monthly',
        allowNull: false
      }),
      queryInterface.addColumn('order_payments', 'status', {
        type: DataTypes.STRING(50),
        comment: 'PENDING|ACTIVE|CANCELED|APPROVED|COMPLETED|FAILED',
        allowNull: false
      }),
      queryInterface.addColumn('order_payments', 'due_date', {
        type: DataTypes.DATEONLY,
        defaultValue: fn('now')
      })
    ]);
  },

  down: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('order_payments', 'transaction_id'),
      queryInterface.removeColumn('order_payments', 'recurrency'),
      queryInterface.removeColumn('order_payments', 'status')
    ]);
  }
};
