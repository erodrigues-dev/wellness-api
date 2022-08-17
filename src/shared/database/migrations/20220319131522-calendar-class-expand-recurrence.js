'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('calendars_class', 'recurrence_id', {
      type: Sequelize.UUID,
      allowNull: true
    })
    await queryInterface.removeColumn('calendars_class', 'recurrence_exceptions', {
      type: Sequelize.UUID,
      allowNull: true
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('calendars_class', 'recurrence_id', {
      type: Sequelize.UUID,
      allowNull: true
    })
    await queryInterface.addColumn('calendars_class', 'recurrence_exceptions', {
      type: Sequelize.UUID,
      allowNull: true
    })
  }
}
