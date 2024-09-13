import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import pool from '../models/index';

export const getTransactions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const query = `
    SELECT * FROM transactions;
  `;
  const { rows } = await pool.query(query);
  res.status(200).json(rows);
  return;
});

export const getTransactionById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const query = `
    SELECT * FROM transactions WHERE id = $1;
  `;
  const { rows } = await pool.query(query, [id]);
  if (rows.length === 0) {
    res.status(204).json({});
    return;
  } else {
    res.status(200).json(rows[0]);
    return;
  }
});

export const createTransaction = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement createTransaction
});

export const bulkCreateTransactions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement bulkCreateTransactions
});