"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
('use strict');
module.exports = {
    up: function (queryInterface) {
        return Promise.all([
            queryInterface.addColumn('activities', 'show_in_app', {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }),
            queryInterface.addColumn('activities', 'show_in_web', {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }),
            queryInterface.addColumn('activities', 'max_people', sequelize_1.DataTypes.INTEGER)
        ]);
    },
    down: function (queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('activities', 'show_in_app'),
            queryInterface.removeColumn('activities', 'show_in_web'),
            queryInterface.removeColumn('activities', 'max_people')
        ]);
    }
};
