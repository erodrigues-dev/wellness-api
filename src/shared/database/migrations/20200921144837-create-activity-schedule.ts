import { QueryInterface, DataTypes, fn } from 'sequelize/types';

export function up(queryInterface: QueryInterface) {
  return queryInterface.createTable('activity_schedule', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'activities' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    title: { type: DataTypes.STRING(120), allowNull: false },
    color: { type: DataTypes.STRING(7), allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    start: { type: DataTypes.TIME, allowNull: false },
    end: { type: DataTypes.TIME, allowNull: false },

    recurrent: DataTypes.BOOLEAN,
    recurrent_repeat_every: DataTypes.INTEGER,
    recurrent_frequency: DataTypes.STRING(12),
    recurrent_weekdays: DataTypes.STRING(30),
    recurrent_ends_in: DataTypes.STRING(12),
    recurrent_until: DataTypes.DATEONLY,
    recurrent_ocurrences: DataTypes.INTEGER,

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: fn('now')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: fn('now')
    }
  });
}

export function down(queryInterface: QueryInterface) {
  return queryInterface.dropTable('activity_schedule');
}
