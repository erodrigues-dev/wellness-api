'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all(
      ['test1', 'test2', 'injuries_limitations'].map(column =>
        queryInterface.changeColumn('workout_profiles', column, {
          type: Sequelize.STRING(1200),
          allowNull: true
        })
      )
    );
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all(
      ['test1', 'test2', 'injuries_limitations'].map(column =>
        queryInterface.changeColumn('workout_profiles', column, {
          type: Sequelize.STRING(60),
          allowNull: true
        })
      )
    );
  }
};
