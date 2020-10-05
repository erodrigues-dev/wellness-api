import { DataTypes, QueryInterface } from 'sequelize';
('use strict');

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.changeColumn('package_activities', 'quantity', {
      type: DataTypes.INTEGER,
      allowNull: true
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.changeColumn('package_activities', 'quantity', {
      type: DataTypes.INTEGER,
      allowNull: false
    });
  }
};
