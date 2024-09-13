import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import pool from '../models/index';

export const getTransactions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const query = `
    SELECT * FROM transactions;
  `;
  const { rows } = await pool.query(query);
  res.status(200).json(rows);
});

export const getTransactionById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement getTransactionById
});

export const createTransaction = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement createTransaction
});

export const bulkCreateTransactions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement bulkCreateTransactions
});