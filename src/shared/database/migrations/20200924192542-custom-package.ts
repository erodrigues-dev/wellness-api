import { DataTypes, fn, QueryInterface } from 'sequelize';

export function up(queryInterface: QueryInterface) {
  return queryInterface.createTable('custom_packages', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    customer_id: {
      type: DataTypes.INTEGER,
      references: { model: 'customers' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    description: DataTypes.STRING,
    expiration: DataTypes.DATEONLY,

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
}

export function down(queryInterface: QueryInterface) {
  return queryInterface.dropTable('custom_packages');
}
