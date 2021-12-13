'use strict';

const { QueryInterface, DataTypes, fn } = require('sequelize');

module.exports = {
  /** @param {QueryInterface} queryInterface */
  up: async queryInterface => {
    await queryInterface.addColumn('workout_profiles', 'team_group_id', {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: 'team_groups' },
      onDelete: 'cascade'
    });
    await queryInterface.changeColumn('workout_profiles', 'customer_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'customers' },
      onDelete: 'CASCADE'
    });
  },

  /** @param {QueryInterface} queryInterface */
  down: async queryInterface => {
    await queryInterface.removeColumn('workout_profiles', 'team_group_id');
  }
};
