'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   */
  up: queryInterface =>
    Promise.all([
      queryInterface.addColumn('customers', 'referral_code', { type: DataTypes.STRING(8), allowNull: true }),
      queryInterface.addColumn('customers', 'referral_id', {
        type: DataTypes.INTEGER,
        references: { model: 'customers' },
        allowNull: true,
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      })
    ]),
  /**
   *
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface =>
    Promise.all([
      queryInterface.removeColumn('customers', 'referral_code'),
      queryInterface.removeColumn('customers', 'referral_id')
    ])
};
