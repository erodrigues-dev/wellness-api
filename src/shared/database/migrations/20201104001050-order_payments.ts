import { DataTypes, fn, QueryInterface } from 'sequelize';

('use strict');

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('order_payments', {
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
        type: DataTypes.STRING(10),
        comment: 'money|card',
        allowNull: false
      },
      tip: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      discount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      amount: {
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
    return queryInterface.dropTable('order_payments');
  }
};
