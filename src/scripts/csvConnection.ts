import { Request, Response } from 'express';
import csv from 'csvtojson';
import { createRequest, createResponse } from 'node-mocks-http';
import fs from 'fs';

import { bulkCreateTransactions, getTransactions } from '../controllers/TransactionController'

export default {
  importFromCsv: async () => {
    const csvFilePath = process.env.CSV_IMPORT_PATH as any;
    try {
      const transactions = await csv().fromFile(csvFilePath)
      const req = createRequest<Request>({
        body: transactions
      });
      const res = createResponse<Response>();
      await bulkCreateTransactions(req, res, () => { });
      if (res.statusCode === 400) {
        console.error("Invalid transaction data");
      }
    }
    catch (error) {
      console.error(error)
    }
  },

  exportToCsv: async () => {
    const csvFilePath = process.env.CSV_EXPORT_PATH as any;
    try {
      const req = createRequest<Request>();
      const res = createResponse<Response>();
      await getTransactions(req, res, () => { });
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
  }
}
