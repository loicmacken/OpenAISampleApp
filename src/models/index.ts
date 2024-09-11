import dbConfig from '../config/db.config';

import { Sequelize } from 'sequelize';

import Transaction from './transaction';

const Database = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: false as any,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

Database.define('transaction', Transaction);

(async () => {
  await Database.sync();
})();