'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface =>
    queryInterface.changeColumn('profiles', 'permissions', {
      type: DataTypes.BIGINT,
      allowNull: false
    }),
  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface =>
    queryInterface.changeColumn('profiles', 'permissions', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
};
