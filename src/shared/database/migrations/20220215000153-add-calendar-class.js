'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('calendars_class', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.fn('uuid_generate_v4')
      },
      calendar_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'calendars' },
        onDelete: 'cascade'
      },
      activity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'activities' },
        onDelete: 'cascade'
      },
      date_start: {
        type: Sequelize.DATE,
        allowNull: false
      },
      date_end: {
        type: Sequelize.DATE,
        allowNull: false
      },
      slots: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING(7),
        allowNull: false
      },
      notes: {
        type: Sequelize.STRING(600),
        allowNull: true
      },
      recurrence_rule: {
        type: Sequelize.STRING(1024),
        allowNull: true
      },
      recurrence_exceptions: {
        type: Sequelize.STRING(1024),
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('calendars_class')
  }
}
