'use strict';

const { QueryInterface } = require('sequelize');

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface => {
    return queryInterface.renameTable('activities_schedules', 'events');
  },

  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface => {
    return queryInterface.renameTable('events', 'activities_schedules');
  }
};
