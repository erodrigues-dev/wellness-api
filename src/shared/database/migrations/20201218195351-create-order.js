'use strict';
exports.__esModule = true;
var sequelize_1 = require("sequelize");
module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('orders', {
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
            type: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            payment_type: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            transaction_id: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            transaction_type: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            status: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            amount: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false,
                defaultValue: 0
            },
            discount: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false,
                defaultValue: 0
            },
            tip: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false,
                defaultValue: 0
            },
            quantity: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            webhook_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            paid_until_date: {
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
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: { model: 'employees' }
            }
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('orders');
    }
};
