import { DataTypes, QueryInterface } from 'sequelize';
export const up = (queryInterface: QueryInterface) => {
  return queryInterface.addColumn('activities', 'category_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories'
    }
  });
};

export const down = (queryInterface: QueryInterface) => {
  return queryInterface.removeColumn('activities', 'category_id');
};
