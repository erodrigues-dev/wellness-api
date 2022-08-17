'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'calendars_activities',
      {
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
        }
      },
      {
        uniqueKeys: {
          calendar_id_activity_id_key: {
            fields: ['calendar_id', 'activity_id']
          }
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('calendars_activities');
  }
};
