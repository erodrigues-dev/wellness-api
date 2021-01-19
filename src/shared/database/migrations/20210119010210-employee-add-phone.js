'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface => {
    return queryInterface.addColumn('employees', 'phone', {
      type: DataTypes.STRING(20),
      allowNull: true
    });
  },

  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => {
    return queryInterface.removeColumn('employees', 'phone');
  }
};
