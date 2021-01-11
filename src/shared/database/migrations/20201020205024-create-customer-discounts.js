"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
('use strict');
exports["default"] = {
    up: function (queryInterface) {
        return queryInterface.createTable('customer_discounts', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            customer_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'customers' },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            relation_type: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
                comment: 'package|activity'
            },
            relation_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: 'relation with package or activity'
            },
            type: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
                comment: 'percent|amount'
            },
            value: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'employees' },
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
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
        return queryInterface.dropTable('customer_discounts');
    }
};
