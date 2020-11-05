import { DataTypes, fn, QueryInterface } from 'sequelize';

('use strict');

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('order_items', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      order_id: {
        type: DataTypes.INTEGER,
        references: { model: 'orders' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(12),
        allowNull: false,
        comment: 'package|activity'
      },
      metadata_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'activity_id|package_id'
      },
      parent_id: {
        type: DataTypes.INTEGER,
        references: { model: 'order_items' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        comment: 'activity self relation with package_id'
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      recurrency: {
        type: DataTypes.STRING(50),
        comment: 'one-time|weekly|monthly'
      },
      value_type: {
        type: DataTypes.STRING(50),
        comment: 'minutes|amount|unlimited|appointments'
      },
      value: {
        type: DataTypes.DECIMAL
      },
      expires_in: {
        type: DataTypes.DATE
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: fn('now')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: fn('now')
      }
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('order_items');
  }
};
