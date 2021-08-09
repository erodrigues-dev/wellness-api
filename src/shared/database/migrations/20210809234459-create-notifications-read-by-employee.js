'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /***
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface =>
    queryInterface.createTable('notification_read_by_employees', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      notification_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'notifications' }
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'employees' }
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    }),

  down: async queryInterface => queryInterface.dropTable('notification_read_by_employees')
};
