'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'employees_specialties',
      {
        employee_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'employees' },
          onDelete: 'cascade'
        },
        specialty_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'specialties' },
          onDelete: 'cascade'
        }
      },
      {
        uniqueKeys: {
          employee_id_specialty_id: {
            fields: ['employee_id', 'specialty_id']
          }
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('employees_specialties');
  }
};
