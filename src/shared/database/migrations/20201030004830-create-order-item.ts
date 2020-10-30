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
        allowNull: false,
        references: { model: 'orders' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      type: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      parent_id: {
        type: DataTypes.INTEGER,
        references: { model: 'order_items' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      recurrency: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      value_type: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      value: {
        type: DataTypes.DECIMAL,
        allowNull: false
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
