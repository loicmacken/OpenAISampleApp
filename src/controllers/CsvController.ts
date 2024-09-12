import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler'; 
import csv from 'csvtojson';
import { createRequest, createResponse } from 'node-mocks-http';
import fs from 'fs';

import { bulkCreateTransactions, getTransactions } from './TransactionController'

export const importFromCsv = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const csvFilePath = process.env.CSV_IMPORT_PATH as any;
  try {
    // TODO validate csvFilePath
    const transactions = csv().fromFile(csvFilePath)
    const req = createRequest<Request>({
      body: transactions
    });
    const res = createResponse<Response>();
    await bulkCreateTransactions(req, res, () => {});
  }
  catch (error) {
    console.error(error)
    res.status(500).send('Internal server error')
  }
  res.status(201).send('Transactions created successfully')
  return;
});

export const exportToCsv = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const csvFilePath = process.env.CSV_EXPORT_PATH as any;
  try {
    // TODO validate csvFilePath
    const transactions = await getTransactions(req, res, () => {});
    const csvString = ""; // TODO: Implement csvString
    fs.writeFileSync(csvFilePath, csvString);
  }
  catch (error) {
    console.error(error)
    res.status(500).send('Internal server error')
  }
  res.status(200).send('Transactions exported successfully')
  return;
});
