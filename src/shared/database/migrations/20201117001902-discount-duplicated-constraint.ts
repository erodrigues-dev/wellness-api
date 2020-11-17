import { QueryInterface } from 'sequelize';

('use strict');

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addIndex(
      'customer_discounts',
      ['customer_id', 'relation_type', 'relation_id'],
      {
        name: 'idx_unique_discount',
        unique: true
      }
    );
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeIndex(
      'customer_discounts',
      'idx_unique_discount'
    );
  }
};
