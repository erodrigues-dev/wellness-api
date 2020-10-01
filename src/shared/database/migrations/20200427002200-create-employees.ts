'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'employees',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(120),
          allowNull: false
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        password: {
          type: Sequelize.STRING(60),
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      },
      {
        uniqueKeys: {
          unique_email: {
            fields: ['email']
          }
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('employees');
  }
};
