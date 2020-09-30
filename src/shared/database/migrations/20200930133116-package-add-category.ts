import { DataTypes, QueryInterface } from 'sequelize';
('use strict');

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn('packages', 'category_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'categories' }
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn('packages', 'category_id');
  }
};
