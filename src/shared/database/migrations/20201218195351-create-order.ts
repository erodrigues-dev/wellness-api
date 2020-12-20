'use strict';

import { DataTypes, fn, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('orders', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'customers' }
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      payment_type: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      transaction_id: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      transaction_type: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
      },
      discount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
      },
      tip: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
      },
      webhook_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      paid_until_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: fn('now')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: fn('now')
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'employees' }
      }
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('orders');
  }
};
