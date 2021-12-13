const { QueryInterface, DataTypes, fn } = require('sequelize');

module.exports = {
  /** @param {QueryInterface} queryInterface */
  up: async queryInterface => {
    await queryInterface.createTable('team_groups', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: fn('uuid_generate_v4')
      },
      name: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    });

    await queryInterface.createTable('team_groups_members', {
      team_group_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'team_groups' },
        onDelete: 'cascade',
        primaryKey: true
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'customers' },
        onDelete: 'cascade',
        primaryKey: true
      }
    });
  },

  /** @param {QueryInterface} queryInterface */
  down: async queryInterface => {
    await queryInterface.dropTable('team_groups_members');
    await queryInterface.dropTable('team_groups');
  }
};
