"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
('use strict');
exports["default"] = {
    up: function (queryInterface) {
        return queryInterface.addColumn('categories', 'type', {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false
        });
    },
    down: function (queryInterface) {
        return queryInterface.removeColumn('categories', 'type');
    }
};
