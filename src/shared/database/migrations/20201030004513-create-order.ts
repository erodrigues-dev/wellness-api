import { DataTypes, fn, QueryInterface } from 'sequelize';

('use strict');

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('orders', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'customers' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      discount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      tip: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'employees' },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
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
    return queryInterface.dropTable('orders');
  }
};
