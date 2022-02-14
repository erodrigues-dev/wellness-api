'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('calendars_entries', 'label_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'calendars_labels' },
      onDelete: 'set null'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('calendars_entries', 'label_id');
  }
};
