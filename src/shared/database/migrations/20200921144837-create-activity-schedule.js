"use strict";
exports.__esModule = true;
exports.down = exports.up = void 0;
var sequelize_1 = require("sequelize");
function up(queryInterface) {
    return queryInterface.createTable('activity_schedule', {
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        activity_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'activities' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        title: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
        color: { type: sequelize_1.DataTypes.STRING(7), allowNull: false },
        date: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
        start: { type: sequelize_1.DataTypes.TIME, allowNull: false },
        end: { type: sequelize_1.DataTypes.TIME, allowNull: false },
        recurrent: sequelize_1.DataTypes.BOOLEAN,
        repeat_every: sequelize_1.DataTypes.INTEGER,
        frequency: sequelize_1.DataTypes.STRING(12),
        weekdays: sequelize_1.DataTypes.STRING(30),
        ends_in: sequelize_1.DataTypes.STRING(12),
        until: sequelize_1.DataTypes.DATEONLY,
        ocurrences: sequelize_1.DataTypes.INTEGER,
        created_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.fn('now')
        },
        updated_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.fn('now')
        }
    });
}
exports.up = up;
function down(queryInterface) {
    return queryInterface.dropTable('activity_schedule');
}
exports.down = down;
