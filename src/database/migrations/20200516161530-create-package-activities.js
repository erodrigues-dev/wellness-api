'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'package_activities',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        package_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'packages'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        activity_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'activities'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      },
      {
        uniqueKeys: {
          unique_package_activity: {
            fields: ['package_id', 'activity_id']
          }
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('package_activities')
  }
}
