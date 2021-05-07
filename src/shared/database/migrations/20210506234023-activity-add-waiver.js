'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface =>
    queryInterface.addColumn('activities', 'waiver_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'waivers' },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    }),

  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => queryInterface.removeColumn('activities', 'waiver_id')
};
