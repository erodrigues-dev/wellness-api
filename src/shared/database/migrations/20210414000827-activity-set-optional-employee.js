'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface => {
    return queryInterface.changeColumn('activities', 'employee_id', {
      type: DataTypes.INTEGER,
      allowNull: true
    });
  },

  down: async queryInterface => {
    return queryInterface.changeColumn('activities', 'employee_id', {
      type: DataTypes.INTEGER,
      allowNull: false
    });
  }
};
