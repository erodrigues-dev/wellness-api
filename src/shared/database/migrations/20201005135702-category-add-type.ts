import { DataTypes, QueryInterface } from 'sequelize';
('use strict');

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn('categories', 'type', {
      type: DataTypes.STRING(50),
      allowNull: false
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn('categories', 'type');
  }
};
