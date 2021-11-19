'use strict';

const { QueryInterface, DataTypes } = require('sequelize');

const queryFillActivityEmployees = `
insert into activity_employees (activity_id, employee_id, created_at, updated_at) (
  select
    id as "activity_id",
    employee_id,
    now() as "created_at",
    now() as "updated_at"
  from activities
  where employee_id is not null
);
`;

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async queryInterface => {
    await queryInterface.sequelize.query(queryFillActivityEmployees);
    await queryInterface.removeColumn('activities', 'employee_id');
  },
  /**
   * @param {QueryInterface} queryInterface
   */
  down: async queryInterface =>
    queryInterface.addColumn('activities', 'employee_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'employees' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
};
