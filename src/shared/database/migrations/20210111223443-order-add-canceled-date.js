'use strict';
exports.__esModule = true;
var sequelize_1 = require("sequelize");
module.exports = {
    up: function (queryInterface) {
        return queryInterface.addColumn('orders', 'canceled_date', {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        });
    },
    down: function (queryInterface) {
        return queryInterface.removeColumn('orders', 'canceled_date');
    }
};
