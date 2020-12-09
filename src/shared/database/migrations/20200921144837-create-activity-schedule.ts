import { DataTypes, fn, QueryInterface } from 'sequelize';

export function up(queryInterface: QueryInterface) {
  return queryInterface.createTable('activities_schedules', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
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
    repeat_every: DataTypes.INTEGER,
    frequency: DataTypes.STRING(12),
    weekdays: DataTypes.STRING(30),
    ends_in: DataTypes.STRING(12),
    until: DataTypes.DATEONLY,
    ocurrences: DataTypes.INTEGER,

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
  return queryInterface.dropTable('activities_schedules');
}
