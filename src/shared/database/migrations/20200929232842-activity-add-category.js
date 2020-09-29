"use strict";
exports.__esModule = true;
exports.down = exports.up = void 0;
var sequelize_1 = require("sequelize");
exports.up = function (queryInterface) {
    return queryInterface.addColumn('activities', 'category_id', {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories'
        }
    });
};
exports.down = function (queryInterface) {
    return queryInterface.removeColumn('activities', 'category_id');
};
