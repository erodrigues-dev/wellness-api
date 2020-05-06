'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'role')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'role', {
      type: Sequelize.STRING(20)
    })
  }
}
