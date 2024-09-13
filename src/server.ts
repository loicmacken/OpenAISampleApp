import express from 'express';
import { Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';
dotenv.config();

import router from './routes/routes';

const app = express();
const port = process.env.PORT || 8080;

app.use('/', router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => console.log(`Server running on port ${port}`));