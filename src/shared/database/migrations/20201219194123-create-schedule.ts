'use strict';

import { DataTypes, fn, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('schedules', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'customers' }
      },
      activity_schedule_id: {
        type: DataTypes.INTEGER
      },
      order_activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'order_activities' }
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      start: {
        type: DataTypes.TIME,
        allowNull: false
      },
      end: {
        type: DataTypes.TIME,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      attender_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'employees' }
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
