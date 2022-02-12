'use strict';

module.exports = {
  up: async queryInterface => {
    try {
      await queryInterface.dropTable('schedules');
      await queryInterface.dropTable('events');
    } catch (err) {}
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.resolve();
  }
};
