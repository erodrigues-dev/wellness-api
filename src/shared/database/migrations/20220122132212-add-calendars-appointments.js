'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('calendars_appointments', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.fn('uuid_generate_v4')
      },
      date_start: {
        type: Sequelize.DATE,
        allowNull: false
      },
      date_end: {
        type: Sequelize.DATE,
        allowNull: false
      },
      calendar_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'calendars' }
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'customers' }
      },
      activity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'activities' }
      },
      notes: {
        type: Sequelize.STRING(600),
        allowNull: true
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('calendars_appointments')
  }
}
