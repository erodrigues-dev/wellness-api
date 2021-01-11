"use strict";
exports.__esModule = true;
exports.down = exports.up = void 0;
var sequelize_1 = require("sequelize");
function up(queryInterface) {
    return queryInterface.createTable('categories', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
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
}
exports.up = up;
function down(queryInterface) {
    return queryInterface.dropTable('categories');
}
exports.down = down;
