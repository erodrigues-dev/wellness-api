import { QueryInterface, DataTypes } from 'sequelize';
('use strict');

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.addColumn('activities', 'show_in_app', {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }),
      queryInterface.addColumn('activities', 'show_in_web', {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }),
      queryInterface.addColumn('activities', 'max_people', DataTypes.INTEGER)
    ]);
  },

  down: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('activities', 'show_in_app'),
      queryInterface.removeColumn('activities', 'show_in_web'),
      queryInterface.removeColumn('activities', 'max_people')
    ]);
  }
};
