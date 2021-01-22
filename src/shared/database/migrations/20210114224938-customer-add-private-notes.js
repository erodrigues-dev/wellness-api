'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface => {
    return queryInterface.addColumn('customers', 'private_notes', {
      type: DataTypes.TEXT,
      allowNull: true
    });
  },
  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => {
    return queryInterface.removeColumn('customers', 'private_notes');
  }
};
