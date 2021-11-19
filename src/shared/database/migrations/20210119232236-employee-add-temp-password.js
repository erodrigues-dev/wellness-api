'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('employees', 'temp_password', {
      type: Sequelize.STRING(60),
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('employees', 'temp_password');
  }
};
