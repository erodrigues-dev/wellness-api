'use strict';

import { DataTypes, fn, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('schedules', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'customers' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      activity_schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'activities_schedules' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: fn('now')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: fn('now')
      }
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('schedules');
  }
};
