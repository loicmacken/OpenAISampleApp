import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import pool from '../models/index';
import validateTransaction from '../validators/TransactionValidator';
import { classifyTransaction, bulkClassifyTransactions } from '../services/OpenAIService';
import { Transaction } from '../models/Transaction';
import { QueryResult } from 'pg';

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
  (transaction||{}).description = transaction.description || "";
  (transaction||{}).transactioncategory = transaction.transactioncategory || null;

  if (validateTransaction(transaction)) {
    if (transaction.transactioncategory === null) {
      transaction = await classifyTransaction(transaction);
      if (transaction === undefined) {
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
    await client.query(query).then((result: QueryResult) => {
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

  req.body.map((transaction: Transaction) => {
    if (!validateTransaction(transaction)) {
      res.status(400).json({ error: "Invalid transaction data" });
      return;
    }
    (transaction||{}).description = transaction.description || "";
    (transaction||{}).transactioncategory = transaction.transactioncategory || null;
  });

  const classifiedTransactions = await bulkClassifyTransactions(req.body);
  if (classifiedTransactions.length < 1) {
    res.status(400).json({ error: "Invalid transaction data" });
    return;
  }

  const values = classifiedTransactions.map((transaction: Transaction) => {
    return `('${transaction.id}', ${transaction.amount}, '${transaction.timestamp}', '${transaction.description}', '${transaction.transactiontype}', '${transaction.accountnumber}', '${transaction.transactioncategory}')`;
  }).join(',');

  const query = `
    INSERT INTO transactions (id, amount, timestamp, description, transactiontype, accountnumber, transactioncategory)
    VALUES ${values}
    RETURNING *;
  `;

  const client = await pool.connect();
  await client.query(query).then((result: QueryResult) => {
    res.status(201).json(result.rows);
    client.release();
  });
});