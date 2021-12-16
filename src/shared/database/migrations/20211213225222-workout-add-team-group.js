'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

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
      allowNull: true
    });
  },

  /** @param {QueryInterface} queryInterface */
  down: async queryInterface => {
    await queryInterface.removeColumn('workout_profiles', 'team_group_id');
    await queryInterface.changeColumn('workout_profiles', 'customer_id', {
      type: DataTypes.INTEGER,
      allowNull: false
    });
  }
};
