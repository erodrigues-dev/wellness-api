'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface =>
    queryInterface.createTable('workout_profiles', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'customers' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      height: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      goal: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      test1: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      test2: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      injuries_limitations: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      experience_level: {
        type: DataTypes.STRING(60),
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
  down: async queryInterface => queryInterface.dropTable('workout_profiles')
};
