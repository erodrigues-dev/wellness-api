import { Options } from 'sequelize';

export const DB_CONFIG: Options = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 5432),
  define: {
    timestamps: true,
    underscored: true
  }
};
