'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('activities', 'employee_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'employees'
      },
      onUpdate: 'cascade',
      onDelete: 'set null'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('activities', 'employee_id')
  }
}
