export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('activities_schedules', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    activity_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'activities' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    title: { type: Sequelize.STRING(120), allowNull: false },
    color: { type: Sequelize.STRING(7), allowNull: false },
    date: { type: Sequelize.DATEONLY, allowNull: false },
    start: { type: Sequelize.TIME, allowNull: false },
    end: { type: Sequelize.TIME, allowNull: false },

    recurrent: Sequelize.BOOLEAN,
    repeat_every: Sequelize.INTEGER,
    frequency: Sequelize.STRING(12),
    weekdays: Sequelize.STRING(30),
    ends_in: Sequelize.STRING(12),
    until: Sequelize.DATEONLY,
    ocurrences: Sequelize.INTEGER,

    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    }
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('activities_schedules');
}
