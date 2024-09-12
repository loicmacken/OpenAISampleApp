export default {
  development: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME_DEV as string,
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT as unknown as number,
    dialect: 'postgres' as any,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME_TEST as string,
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT as unknown as number,
    dialect: 'postgres' as any,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME_TEST as string,
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT as unknown as number,
    dialect: 'postgres' as any,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};