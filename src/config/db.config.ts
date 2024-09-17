import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    host: process.env.DB_HOST_LOCAL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_DEV,
    port: process.env.DB_PORT,
  },
  test: {
    host: process.env.DB_HOST_LOCAL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    port: process.env.DB_PORT,
  },
  production: {
    host: process.env.DB_HOST_LOCAL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_PROD,
    port: process.env.DB_PORT,
  },
};