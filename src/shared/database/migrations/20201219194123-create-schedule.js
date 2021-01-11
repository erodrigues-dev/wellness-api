'use strict';
exports.__esModule = true;
var sequelize_1 = require("sequelize");
module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('schedules', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            customer_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'customers' }
            },
            activity_schedule_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: { model: 'activities_schedules' },
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL'
            },
            order_activity_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'order_activities' }
            },
            title: {
                type: sequelize_1.DataTypes.STRING(200),
                allowNull: false
            },
            date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false
            },
            start: {
                type: sequelize_1.DataTypes.TIME,
                allowNull: false
            },
            end: {
                type: sequelize_1.DataTypes.TIME,
                allowNull: false
            },
            status: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            attender_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: { model: 'employees' }
            },
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
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('schedules');
    }
};
