import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Category extends Model {
  id: number;
  name: string;
  type: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static setup(connection: Sequelize) {
    Category.init(
      {
        name: DataTypes.STRING,
        type: DataTypes.STRING
      },
      { sequelize: connection, tableName: 'categories' }
    );
  }

  static setupAssociations() {}
}
