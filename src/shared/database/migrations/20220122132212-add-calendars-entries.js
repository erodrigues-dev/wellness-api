'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('calendars_entries', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.fn('uuid_generate_v4')
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
      date_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      activity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'activities' }
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('calendars_entries');
  }
};
