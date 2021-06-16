'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface =>
    queryInterface.createTable('workout_exercise_logs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      workout_log_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'workout_logs' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      set1_reps: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      set1_weight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      set2_reps: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      set2_weight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      set3_reps: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      set3_weight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      set4_reps: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      set4_weight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    }),
  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => queryInterface.dropTable('workout_exercise_logs')
};
