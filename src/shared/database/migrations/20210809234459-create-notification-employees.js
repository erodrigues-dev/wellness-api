'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /***
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface =>
    queryInterface.createTable('notification_employees', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      notification_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'notifications' },
        onDelete: 'CASCADE'
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'employees' },
        onDelete: 'CASCADE'
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    }),

  down: async queryInterface => queryInterface.dropTable('notification_employees')
};
