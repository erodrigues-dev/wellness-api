'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('calendars_appointments', 'calendar_class_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'calendars_class' }
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('calendars_appointments', 'calendar_class_id')
  }
}
