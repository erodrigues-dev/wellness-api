'use strict';
exports.__esModule = true;
exports.down = exports.up = void 0;
var types_1 = require('sequelize');
function up(queryInterface) {
  return queryInterface.createTable('activities_schedules', {
    id: {
      type: types_1.DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    activity_id: {
      type: types_1.DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'activities' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    title: { type: types_1.DataTypes.STRING(120), allowNull: false },
    color: { type: types_1.DataTypes.STRING(7), allowNull: false },
    date: { type: types_1.DataTypes.DATEONLY, allowNull: false },
    start: { type: types_1.DataTypes.TIME, allowNull: false },
    end: { type: types_1.DataTypes.TIME, allowNull: false },
    recurrent: types_1.DataTypes.BOOLEAN,
    recurrent_repeat_every: types_1.DataTypes.INTEGER,
    recurrent_frequency: types_1.DataTypes.STRING(12),
    recurrent_weekdays: types_1.DataTypes.STRING(30),
    recurrent_ends_in: types_1.DataTypes.STRING(12),
    recurrent_until: types_1.DataTypes.DATEONLY,
    recurrent_ocurrences: types_1.DataTypes.INTEGER,
    created_at: {
      type: types_1.DataTypes.DATE,
      allowNull: false,
      defaultValue: types_1.fn('now')
    },
    updated_at: {
      type: types_1.DataTypes.DATE,
      allowNull: false,
      defaultValue: types_1.fn('now')
    }
  });
}
exports.up = up;
function down(queryInterface) {
  return queryInterface.dropTable('activities_schedules');
}
exports.down = down;
