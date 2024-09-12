import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const getTransactions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement getTransactions
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