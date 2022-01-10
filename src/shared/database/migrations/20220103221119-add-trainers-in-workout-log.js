'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /** @param {QueryInterface} queryInterface */
  up: async queryInterface => {
    await queryInterface.createTable(
      'workout_log_trainers',
      {
        workout_log_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'workout_logs' },
          onDelete: 'cascade'
        },
        trainer_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'employees' },
          onDelete: 'cascade'
        }
      },
      {
        uniqueKeys: {
          workout_log_trainer_idx: {
            fields: ['workout_log_id', 'trainer_id']
          }
        }
      }
    );
  },

  /** @param {QueryInterface} queryInterface */
  down: async queryInterface => {
    await queryInterface.dropTable('workout_log_trainers');
  }
};
