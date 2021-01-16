import { DataTypes, Model, Sequelize } from 'sequelize';

export default class EmailConfirmationCode extends Model {
  id: number;
  email: string;
  code: string;

  readonly createdAt: Date;

  static setup(connection: Sequelize) {
    EmailConfirmationCode.init(
      {
        email: DataTypes.STRING,
        code: DataTypes.STRING
      },
      { sequelize: connection, tableName: 'email_confirmation_codes' }
    );
  }

  static setupAssociations() {}
}
