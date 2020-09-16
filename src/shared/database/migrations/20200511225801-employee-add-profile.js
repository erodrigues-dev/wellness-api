'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('employees', 'profile_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'profiles'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('employees', 'profile_id')
  }
}
