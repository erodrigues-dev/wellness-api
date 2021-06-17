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
        allowNull: false
      },
      height: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      goal: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      test1: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      test2: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      injuries_limitations: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      experience_level: {
        type: DataTypes.STRING(60),
        allowNull: false
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
