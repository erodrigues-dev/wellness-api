'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('calendars_class', ['date_start'])
    await queryInterface.addIndex('calendars_class', ['recurrence_id'])
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('calendars_class', ['date_start'])
    await queryInterface.removeIndex('calendars_class', ['recurrence_id'])
  }
}
