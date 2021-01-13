"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
('use strict');
module.exports = {
    up: function (queryInterface) {
        return queryInterface.changeColumn('package_activities', 'quantity', {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        });
    },
    down: function (queryInterface) {
        return queryInterface.changeColumn('package_activities', 'quantity', {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        });
    }
};
