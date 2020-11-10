import { DataTypes, QueryInterface } from 'sequelize';

('use strict');

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn(
      'customers',
      'square_id',
      DataTypes.STRING(32)
    );
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn('customers', 'square_id');
  }
};
