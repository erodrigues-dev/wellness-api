"use strict";
exports.__esModule = true;
exports.down = exports.up = void 0;
var sequelize_1 = require("sequelize");
function up(queryInterface) {
    return queryInterface.createTable('custom_packages_activities', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        custom_package_id: {
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: 'custom_packages' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            allowNull: false
        },
        activity_id: {
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: 'activities' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            allowNull: false
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
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
    }, {
        uniqueKeys: {
            unique_custom_package_activity: {
                fields: ['custom_package_id', 'activity_id']
            }
        }
    });
}
exports.up = up;
function down(queryInterface) {
    return queryInterface.dropTable('custom_packages_activities');
}
exports.down = down;
