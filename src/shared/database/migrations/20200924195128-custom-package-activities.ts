import { DataTypes, fn, QueryInterface } from 'sequelize';

export function up(queryInterface: QueryInterface) {
  return queryInterface.createTable(
    'custom_packages_activities',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      custom_package_id: {
        type: DataTypes.INTEGER,
        references: { model: 'custom_packages' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      activity_id: {
        type: DataTypes.INTEGER,
        references: { model: 'activities' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
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
    },
    {
      uniqueKeys: {
        unique_custom_package_activity: {
          fields: ['custom_package_id', 'activity_id']
        }
      }
    }
  );
}

export function down(queryInterface) {
  return queryInterface.dropTable('custom_packages_activities');
}
