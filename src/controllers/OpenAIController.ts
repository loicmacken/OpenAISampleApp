import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

export const classifyTransaction = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement classifyTransaction
});

export const bulkClassifyTransactions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement bulkClassifyTransactions
});