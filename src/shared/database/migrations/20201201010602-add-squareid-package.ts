import { DataTypes, QueryInterface } from 'sequelize';

('use strict');

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn(
      'packages',
      'square_id',
      DataTypes.STRING(255)
    );
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn('packages', 'square_id');
  }
};
