import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler'; 
import csv from 'csvtojson';
import { createRequest, createResponse } from 'node-mocks-http';
import fs from 'fs';

import { bulkCreateTransactions, getTransactions } from '../controllers/TransactionController'

export const importFromCsv = asyncHandler(async () => {
  const csvFilePath = process.env.CSV_IMPORT_PATH as any;
  try {
    const transactions = csv().fromFile(csvFilePath)
    const req = createRequest<Request>({
      body: transactions
    });
    const res = createResponse<Response>();
    await bulkCreateTransactions(req, res, () => {});
  }
  catch (error) {
    console.error(error)
  }
});

export const exportToCsv = asyncHandler(async (req: Request, res: any, next: NextFunction) => {
  const csvFilePath = process.env.CSV_EXPORT_PATH as any;
  try {
    await getTransactions(req, res, () => {});
    const transactions = res._getJSONData() as any;
    const header_row = "Transaction ID,Amount,Timestamp,Description,Transaction Type,Account Number,Transaction Category\n";
    let csvString = header_row;
    transactions.forEach((transaction: any) => {
      csvString += `${transaction.id},${transaction.amount},${transaction.timestamp},${transaction.description},${transaction.transactiontype},${transaction.accountnumber},${transaction.transactioncategory}\n`;
    });
    fs.writeFileSync(csvFilePath, csvString);
  }
  catch (error) {
    console.error(error)
  }
});
