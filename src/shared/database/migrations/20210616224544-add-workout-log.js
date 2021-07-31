'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface =>
    queryInterface.createTable('workout_logs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      workout_profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'workout_profiles' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      resume: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    }),
  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => queryInterface.dropTable('workout_logs')
};
