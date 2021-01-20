'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('email_confirmation_codes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      code: {
        type: Sequelize.STRING(36),
        allowNull: false
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: true }
    });

    await queryInterface.addIndex('email_confirmation_codes', [
      'email',
      'code'
    ]);
  },
  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => {
    await queryInterface.dropTable('email_confirmation_codes');
  }
};
