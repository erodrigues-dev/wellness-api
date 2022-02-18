'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('calendars_class_appointments', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.fn('uuid_generate_v4')
      },
      calendar_class_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'calendars_class' }
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'customers' }
      },
      calendar_label_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'calendars_labels' },
        onDelete: 'set null'
      },
      date_start: {
        type: Sequelize.DATE,
        allowNull: false
      },
      date_end: {
        type: Sequelize.DATE,
        allowNull: false
      },
      notes: {
        type: Sequelize.STRING(600),
        allowNull: true
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      canceled_at: Sequelize.DATE
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('calendars_class_appointments')
  }
}
