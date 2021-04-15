'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface => {
    return queryInterface.createTable('specialties', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    });
  },

  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => {
    return queryInterface.dropTable('specialties');
  }
};
