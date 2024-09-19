import dotenv from 'dotenv';
import { PoolConfig } from 'pg';
dotenv.config();

export const dbConfig: PoolConfig = {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT_LOCAL as number | undefined,
};