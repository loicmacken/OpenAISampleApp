import express from 'express';
import { getTransactions, getTransactionById, createTransaction } from '../controllers/TransactionController.js';

const router = express.Router();

router.get('/transactions', getTransactions);
router.get('/transactions/:id', getTransactionById);
router.post('/transactions', createTransaction);

export default router;