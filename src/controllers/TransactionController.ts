import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import pool from '../models/index';
import validateTransaction from '../validators/TransactionValidator';
import { classifyTransaction, bulkClassifyTransactions } from '../services/OpenAIService';

export const getTransactions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const query = `
    SELECT * FROM transactions;
  `;
  const client = await pool.connect();
  await client.query(query).then((result) => {
    client.release();
    res.status(200).json(result.rows);
  });

  return;
});

export const getTransactionById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const query = `
    SELECT * FROM transactions WHERE id = '${id}';
  `;
 
  const client = await pool.connect();
  await client.query(query).then((result) => {
    if (result.rows.length === 0) {
      res.status(204).json({});
    } else {
      res.status(200).json(result.rows[0]);
    }
    client.release();
  });

  return;
});

export const createTransaction = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let transaction = req.body;
  if (!transaction.description) { transaction.description = ""; }
  if (!transaction.transactioncategory) { transaction.transactioncategory = null; }

  if (validateTransaction(transaction)) {
    if (transaction.transactioncategory === null) {
      transaction = await classifyTransaction(transaction);
      if (!transaction) {
        res.status(400).json({ error: "Invalid transaction data" });
        return;
      }
    }

    const query = `
      INSERT INTO transactions (id, amount, timestamp, description, transactiontype, accountnumber, transactioncategory)
      VALUES (
        '${transaction.id}',
        '${transaction.amount}',
        '${transaction.timestamp}',
        '${transaction.description}',
        '${transaction.transactiontype}',
        '${transaction.accountnumber}',
        '${transaction.transactioncategory}'
      )
      RETURNING *;
    `;

    const client = await pool.connect();
    await client.query(query).then((result: any) => {
      res.status(201).json(result.rows[0]);
      client.release();
    });
  }
  else {
    res.status(400).json({ error: "Invalid transaction data" });
    return;
  }
});

export const bulkCreateTransactions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.length < 1) {
    res.status(400).json({ error: "Invalid transaction data" });
    return;
  }

  req.body.map((transaction: any) => {
    if (!transaction.description) { transaction.description = ""; }
    if (!transaction.transactioncategory) { transaction.transactioncategory = null; }
  });

  const classifiedTransactions = await bulkClassifyTransactions(req.body);
  if (classifiedTransactions.length < 1) {
    res.status(400).json({ error: "Invalid transaction data" });
    return;
  }
  
  let ids: Array<string> = [];
  let amounts: Array<string> = [];
  let timestamps: Array<string> = [];
  let descriptions: Array<string> = [];
  let transactiontypes: Array<string> = [];
  let accountnumbers: Array<string> = [];
  let transactioncategories: Array<string> = [];
  
  classifiedTransactions.forEach((transaction: any) => {
    ids.push(transaction.id);
    amounts.push(transaction.amount);
    timestamps.push(transaction.timestamp);
    descriptions.push(transaction.description);
    transactiontypes.push(transaction.transactiontype);
    accountnumbers.push(transaction.accountnumber);
    transactioncategories.push(transaction.transactioncategory);
  })

  const query = `
    INSERT INTO transactions (id, amount, timestamp, description, transactiontype, accountnumber, transactioncategory)
    VALUES ('${ids}', '${amounts}' , '${timestamps}', '${descriptions}', '${transactiontypes}', '${accountnumbers}', '${transactioncategories}')
    RETURNING *;
  `;

  const client = await pool.connect();
  await client.query(query).then((result: any) => {
    res.status(201).json(result.rows);
    client.release();
  });
});