import { Pool, types } from 'pg';

// Parse date and time to string to avoid timezone conversion
types.setTypeParser(types.builtins.TIME, (timeStr) => timeStr);
types.setTypeParser(types.builtins.TIMESTAMP, (timeStr) => timeStr);
types.setTypeParser(types.builtins.TIMESTAMPTZ, (timeStr) => timeStr);

import dbConfig from '../config/db.config';

const config = dbConfig[process.env.NODE_ENV as 'development' | 'test' | 'production'];
const pool = new Pool(config as any);

export default pool;