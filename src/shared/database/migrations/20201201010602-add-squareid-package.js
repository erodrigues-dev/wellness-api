"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
('use strict');
module.exports = {
    up: function (queryInterface) {
        return queryInterface.addColumn('packages', 'square_id', sequelize_1.DataTypes.STRING(255));
    },
    down: function (queryInterface) {
        return queryInterface.removeColumn('packages', 'square_id');
    }
};
