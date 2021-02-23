'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface => {
    return queryInterface.addColumn('customers', 'temp_password', {
      type: DataTypes.STRING(60),
      allowNull: true
    });
  },

  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => {
    return queryInterface.removeColumn('customers', 'temp_password');
  }
};
