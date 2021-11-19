"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
('use strict');
exports["default"] = {
    up: function (queryInterface) {
        return Promise.all([
            queryInterface.addColumn('packages', 'recurrency_pay', {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: 'one-time'
            }),
            queryInterface.addColumn('packages', 'type', {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: 'appointments'
            }),
            queryInterface.addColumn('packages', 'total', sequelize_1.DataTypes.DECIMAL)
        ]);
    },
    down: function (queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('packages', 'recurrency_pay'),
            queryInterface.removeColumn('packages', 'type'),
            queryInterface.removeColumn('packages', 'total')
        ]);
    }
};
