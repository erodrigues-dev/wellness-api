'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface => {
    await queryInterface.removeConstraint('orders', 'orders_customer_id_fkey');
    await queryInterface.addConstraint('orders', {
      name: 'orders_customer_id_fkey',
      type: 'foreign key',
      fields: ['customer_id'],
      references: { table: 'customers', field: 'id' },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });
  },

  /**
   *
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => {
    await queryInterface.removeConstraint('orders', 'orders_customer_id_fkey');
    await queryInterface.addConstraint('orders', {
      name: 'orders_customer_id_fkey',
      type: 'foreign key',
      fields: ['customer_id'],
      references: { table: 'customers', field: 'id' },
      onUpdate: 'no action',
      onDelete: 'no action'
    });
  }
};
