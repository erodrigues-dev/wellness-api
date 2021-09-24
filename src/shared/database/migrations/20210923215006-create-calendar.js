'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface => {
    await queryInterface.createTable('calendars', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'categories' }
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      min_hours_to_schedule: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      min_hours_to_cancel: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      max_days_in_future: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      max_entry_per_slot: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE
    });
  },

  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => {
    await queryInterface.dropTable('calendars');
  }
};
