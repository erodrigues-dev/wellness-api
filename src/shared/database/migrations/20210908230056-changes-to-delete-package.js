'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface => {
    await queryInterface.changeColumn('order_packages', 'package_id', {
      type: DataTypes.INTEGER,
      allowNull: true
    });
    await queryInterface.removeConstraint('order_packages', 'order_packages_package_id_fkey');
    await queryInterface.addConstraint('order_packages', {
      name: 'order_packages_package_id_fkey',
      type: 'foreign key',
      fields: ['package_id'],
      references: { table: 'packages', field: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    });
  },
  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => {
    await queryInterface.removeConstraint('order_packages', 'order_packages_package_id_fkey');
    await queryInterface.changeColumn('order_packages', 'package_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'packages' },
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
  }
};
