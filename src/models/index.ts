import dbConfig from '../config/db.config';

import { Sequelize } from 'sequelize';

import { Transaction } from './Transaction';

const config = dbConfig[process.env.NODE_ENV as 'development' | 'test' | 'production'];
const Database = new Sequelize(config.database, config.username, config.password, config);

Database.define('transaction', Transaction);

(async () => {
  await Database.sync();
})();