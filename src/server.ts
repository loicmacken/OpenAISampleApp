import express from 'express';
import { Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';
dotenv.config();

import router from './routes/routes';
import pool from './models/index';
import TransactionMigration from './migrations/TransactionMigration';

const app = express();
const port = process.env.NODE_PORT || 8080;

app.use(express.json());

app.use('/', router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

pool.connect().then(() => {
  TransactionMigration.up().then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  });
});