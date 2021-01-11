'use strict';
exports.__esModule = true;
var sequelize_1 = require("sequelize");
module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('order_activities', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            order_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'orders' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            order_package_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: { model: 'order_packages' }
            },
            activity_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'activities' }
            },
            name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false
            },
            price: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            duration: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            employee_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'employees' }
            },
            category_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'categories' }
            },
            max_people: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            package_quantity: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.fn('now')
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize_1.fn('now')
            }
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('order_activities');
    }
};
