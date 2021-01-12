'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface => {
    return queryInterface.dropTable('functionalities');
  },

  /**
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} Sequelize
   */
  down: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('functionalities', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      actions: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'profiles',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  }
};
