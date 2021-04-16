'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface =>
    Promise.all([
      queryInterface.removeColumn('employees', 'specialty'),
      queryInterface.addColumn('employees', 'specialty_id', {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'specialties' },
        onDelete: 'set null',
        onUpdate: 'set null'
      })
    ]),

  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface =>
    Promise.all([
      queryInterface.removeColumn('employees', 'specialty_id'),
      queryInterface.addColumn('employees', 'specialty', {
        type: DataTypes.STRING(100),
        allowNull: true
      })
    ])
};
