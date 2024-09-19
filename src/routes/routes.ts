import express, { Request, Response, Router } from 'express';
import { getTransactions, getTransactionById, createTransaction } from '../controllers/TransactionController.js';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <h1>Welcome to the Transaction API</h1>
    <p>Use the following endpoints to interact with the API:</p>
    <ul>
      <li>GET /transactions - get all transactions</li>
      <li>GET /transactions/:id - get a transaction by id</li>
      <li>POST /transactions - create a new transaction</li>
    </ul>
  `);
});

router.get('/transactions', getTransactions);
router.get('/transactions/:id', getTransactionById);
router.post('/transactions', createTransaction);

export default router;