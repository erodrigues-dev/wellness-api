'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn('customers', 'public_notes', {
      type: Sequelize.TEXT,
      allowNull: true
    }),

  down: async queryInterface => queryInterface.removeColumn('customers', 'public_notes')
};
