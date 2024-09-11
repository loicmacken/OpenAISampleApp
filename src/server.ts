import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import router from './routes/routes';

const app = express();
const port = process.env.PORT || 8080;

app.use('/', router);

app.listen(port, () => console.log(`Server running on port ${port}`));