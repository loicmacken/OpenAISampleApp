import { Request, Response } from 'express';
import csv from 'csvtojson';
import { createRequest, createResponse } from 'node-mocks-http';
import fs from 'fs';

import { bulkCreateTransactions, getTransactions } from '../controllers/TransactionController'

export default {
  importFromCsv: async () => {
    const csvFilePath = process.env.CSV_IMPORT_PATH as any;
    try {
      const rows = await csv().fromFile(csvFilePath)
      const transactions = rows.map((row: any) => {
        return {
          id: row["Transaction ID"],
          amount: row["Amount"],
          timestamp: row["Timestamp"].slice(0, 19),
          description: row["Description"]? row["Description"] : "",
          transactiontype: row["Transaction Type"],
          accountnumber: row["Account Number"],
          transactioncategory: row["Transaction Category"]? row["Transaction Category"] : null
        }
      });
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
        csvString += `
          ${transaction.id},
          ${transaction.amount},
          ${transaction.timestamp},
          ${transaction.description? transaction.description : ""},
          ${transaction.transactiontype},
          ${transaction.accountnumber},
          ${transaction.transactioncategory? transaction.transactioncategory : null}\n`;
      });
      fs.writeFileSync(csvFilePath, csvString);
    }
    catch (error) {
      console.error(error)
    }
  }
}
