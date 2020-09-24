"use strict";
exports.__esModule = true;
exports.down = exports.up = void 0;
var sequelize_1 = require("sequelize");
function up(queryInterface) {
    return queryInterface.createTable('custom_packages', {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: sequelize_1.DataTypes.INTEGER
        },
        customer_id: {
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: 'customers' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            allowNull: false
        },
        name: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false
        },
        description: sequelize_1.DataTypes.STRING,
        expiration: sequelize_1.DataTypes.DATEONLY,
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
    return queryInterface.dropTable('custom_packages');
}
exports.down = down;
