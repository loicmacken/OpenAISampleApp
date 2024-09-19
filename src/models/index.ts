import pg, { PoolConfig } from 'pg';

// Parse date and time to string to avoid timezone conversion
pg.types.setTypeParser(pg.types.builtins.TIME, (timeStr) => timeStr);
pg.types.setTypeParser(pg.types.builtins.TIMESTAMP, (timeStr) => timeStr);
pg.types.setTypeParser(pg.types.builtins.TIMESTAMPTZ, (timeStr) => timeStr);

import { dbConfig } from '../config/db.config';

const config: PoolConfig = dbConfig;
const pool = new pg.Pool(config);

export default pool;