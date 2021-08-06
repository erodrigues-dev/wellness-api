'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface =>
    queryInterface.createTable('activity_employees', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'activities' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'employees' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    }),
  /**
   *
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => queryInterface.dropTable('activity_employees')
};
