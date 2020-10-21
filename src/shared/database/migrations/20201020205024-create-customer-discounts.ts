import { DataTypes, fn, QueryInterface } from 'sequelize';
('use strict');

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('customer_discounts', {
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
      relation_type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: 'package|activity'
      },
      relation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'relation with package or activity'
      },
      type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: 'percent|amount'
      },
      value: {
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
    return queryInterface.dropTable('customer_discounts');
  }
};
