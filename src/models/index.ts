import pg from 'pg';
import Transaction from './Transaction';

// Parse date and time to string to avoid timezone conversion
pg.types.setTypeParser(pg.types.builtins.TIME, (timeStr) => timeStr);
pg.types.setTypeParser(pg.types.builtins.TIMESTAMP, (timeStr) => timeStr);
pg.types.setTypeParser(pg.types.builtins.TIMESTAMPTZ, (timeStr) => timeStr);

import dbConfig from '../config/db.config';

const config = dbConfig[process.env.NODE_ENV as 'development' | 'test' | 'production'];
const pool = new pg.Pool(config as any);

export default pool;