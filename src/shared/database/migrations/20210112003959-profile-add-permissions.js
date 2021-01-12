'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface => {
    return queryInterface.addColumn('profiles', 'permissions', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },

  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => {
    return queryInterface.removeColumn('profiles', 'permissions');
  }
};
