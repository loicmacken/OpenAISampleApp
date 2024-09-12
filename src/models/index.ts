import { Pool } from 'pg';

import dbConfig from '../config/db.config';

const config = dbConfig[process.env.NODE_ENV as 'development' | 'test' | 'production'];
const pool = new Pool(config as any);

export default pool;