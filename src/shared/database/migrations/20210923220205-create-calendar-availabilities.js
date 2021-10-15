const { QueryInterface, DataTypes, fn } = require('sequelize');

module.exports = {
  /** @param {QueryInterface} queryInterface */
  up: async queryInterface => {
    await queryInterface.createTable('calendar_availabilities', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: fn('uuid_generate_v4')
      },
      calendar_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'calendars' },
        onDelete: 'CASCADE'
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end: {
        type: DataTypes.DATE,
        allowNull: false
      },
      recurrence_rule: {
        type: DataTypes.STRING(1024),
        allowNull: true
      },
      recurrence_exceptions: {
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
