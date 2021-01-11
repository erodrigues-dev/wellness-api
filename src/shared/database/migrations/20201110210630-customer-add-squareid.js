"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
('use strict');
exports["default"] = {
    up: function (queryInterface) {
        return queryInterface.addColumn('customers', 'square_id', sequelize_1.DataTypes.STRING(32));
    },
    down: function (queryInterface) {
        return queryInterface.removeColumn('customers', 'square_id');
    }
};
