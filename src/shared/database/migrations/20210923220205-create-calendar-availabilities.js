const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /** @param {QueryInterface} queryInterface */
  up: async queryInterface => {
    await queryInterface.createTable('calendar_availabilities', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      calendar_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'calendars' },
        onDelete: 'CASCADE'
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      recurrenceRule: {
        type: DataTypes.STRING(1024),
        allowNull: true
      },
      recurrenceExceptions: {
        type: DataTypes.STRING(1024),
        allowNull: true
      },
      status: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    });
  },

  /** @param {QueryInterface} queryInterface */
  down: async queryInterface => {
    await queryInterface.dropTable('calendar_availabilities');
  }
};
