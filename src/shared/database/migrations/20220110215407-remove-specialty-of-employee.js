'use strict';

const queryFillEmployeesSpecialties = `
  insert into employees_specialties
  (employee_id, specialty_id) (
    select
      id as employee_id,
      specialty_id
    from employees
    where specialty_id is not null
  );
`;

module.exports = {
  up: async queryInterface => {
    await queryInterface.sequelize.query(queryFillEmployeesSpecialties);
    await queryInterface.removeColumn('employees', 'specialty_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('employees', 'specialty_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'specialties' },
      onDelete: 'set null'
    });
  }
};
