import { DataTypes, fn, QueryInterface } from 'sequelize';

export function up(queryInterface: QueryInterface) {
  return queryInterface.createTable('categories', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
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
}

export function down(queryInterface: QueryInterface) {
  return queryInterface.dropTable('categories');
}
