'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface =>
    Promise.all([
      queryInterface.changeColumn('activities', 'employee_id', {
        type: DataTypes.INTEGER,
        allowNull: true
      }),
      queryInterface.changeColumn('order_activities', 'employee_id', {
        type: DataTypes.INTEGER,
        allowNull: true
      })
    ]),

  down: async queryInterface =>
    Promise.all([
      queryInterface.changeColumn('activities', 'employee_id', {
        type: DataTypes.INTEGER,
        allowNull: false
      }),
      queryInterface.changeColumn('order_activities', 'employee_id', {
        type: DataTypes.INTEGER,
        allowNull: false
      })
    ])
};
