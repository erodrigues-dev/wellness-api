'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface =>
    queryInterface.addColumn('employees', 'deleted_at', {
      type: DataTypes.DATE,
      allowNull: true
    }),

  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => queryInterface.removeColumn('employees', 'deleted_at')
};
