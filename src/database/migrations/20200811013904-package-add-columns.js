'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('packages', 'show_in_app', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('packages', 'show_in_web', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('packages', 'expiration', {
        type: Sequelize.DATE
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('packages', 'show_in_app'),
      queryInterface.removeColumn('packages', 'show_in_web'),
      queryInterface.removeColumn('packages', 'expiration')
    ])
  }
}
