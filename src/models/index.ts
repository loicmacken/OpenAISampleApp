import dbConfig from '../config/db.config.js';

import { Sequelize } from 'sequelize';

import { Transaction } from './Transaction';

const config = dbConfig[process.env.NODE_ENV as 'development' | 'test' | 'production'];
const Database = new Sequelize(config.database as string, config.username as string, config.password as string, config as any);

Database.define('transaction', Transaction);

(async () => {
  await Database.sync();
})();