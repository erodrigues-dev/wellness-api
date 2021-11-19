'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('customers', 'phone', {
      type: DataTypes.STRING(20),
      allowNull: true
    });
  },

  /**
   * @param {QueryInterface} queryInterface
   */
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('customers', 'phone');
  }
};
