'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('calendars_labels', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.fn('uuid_generate_v4')
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      color: {
        type: Sequelize.STRING(9),
        allowNull: false
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('calendars_labels');
  }
};
