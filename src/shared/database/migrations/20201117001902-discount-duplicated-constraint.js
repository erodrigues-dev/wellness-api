"use strict";
exports.__esModule = true;
('use strict');
module.exports = {
    up: function (queryInterface) {
        return queryInterface.addIndex('customer_discounts', ['customer_id', 'relation_type', 'relation_id'], {
            name: 'idx_unique_discount',
            unique: true
        });
    },
    down: function (queryInterface) {
        return queryInterface.removeIndex('customer_discounts', 'idx_unique_discount');
    }
};
