'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('schedules', 'schedules_customer_id_fkey');
    await queryInterface.addConstraint('schedules', {
      name: 'schedules_customer_id_fkey',
      type: 'foreign key',
      fields: ['customer_id'],
      references: { table: 'customers', field: 'id' },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('schedules', 'schedules_customer_id_fkey');
    await queryInterface.addConstraint('schedules', {
      name: 'schedules_customer_id_fkey',
      type: 'foreign key',
      fields: ['customer_id'],
      references: { table: 'customers', field: 'id' },
      onUpdate: 'no action',
      onDelete: 'no action'
    });
  }
};
