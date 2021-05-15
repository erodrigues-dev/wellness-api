'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * UP
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface =>
    queryInterface.createTable('customer_waivers', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'customers'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      waiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'waivers'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      signed_url: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      signed_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }),
  /**
   * DOWN
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => queryInterface.dropTable('customer_waivers')
};
