'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'packages',
        'showInApp',
        {
          type: Sequelize.BOOLEAN
        }
      ),
      queryInterface.addColumn(
        'packages',
        'showInWeb',
        {
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'packages',
        'expiration',
        {
          type: Sequelize.DATE
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('packages', 'showInApp'),
      queryInterface.removeColumn('packages', 'showInWeb'),
      queryInterface.removeColumn('packages', 'expiration')
    ])
  }
}
