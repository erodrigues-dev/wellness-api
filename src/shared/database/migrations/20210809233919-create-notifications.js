'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /***
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface =>
    queryInterface.createTable('notifications', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      text: DataTypes.TEXT,
      created_by_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'employees' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    }),

  /***
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => queryInterface.dropTable('notifications')
};
