'use strict';
exports.__esModule = true;
var sequelize_1 = require("sequelize");
module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('order_packages', {
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
            package_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'packages' }
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
            category_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'categories' }
            },
            recurrency_pay: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            type: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            total: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: true
            },
            square_id: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            expiration: {
                type: sequelize_1.DataTypes.DATE,
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
        return queryInterface.dropTable('order_packages');
    }
};
