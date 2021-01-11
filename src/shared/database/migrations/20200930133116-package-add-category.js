"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
('use strict');
exports["default"] = {
    up: function (queryInterface) {
        return queryInterface.addColumn('packages', 'category_id', {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'categories' }
        });
    },
    down: function (queryInterface) {
        return queryInterface.removeColumn('packages', 'category_id');
    }
};
