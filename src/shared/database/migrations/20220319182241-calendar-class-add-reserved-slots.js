'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('calendars_class', 'reserved_slots', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('calendars_class', 'reserved_slots')
  }
}
