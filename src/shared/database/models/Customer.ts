import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Customer extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  squareId: string;
  privateNotes: string;
  phone: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static setup(connection: Sequelize) {
    Customer.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        squareId: DataTypes.STRING,
        privateNotes: DataTypes.STRING,
        phone: DataTypes.STRING
      },
      { sequelize: connection, tableName: 'customers' }
    );
  }

  static setupAssociations() {}
}
