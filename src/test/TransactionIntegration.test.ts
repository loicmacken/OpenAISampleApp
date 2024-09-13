import jest from 'jest';
import { Request, Response } from 'express';
import { createRequest, createResponse } from 'node-mocks-http';

import { getTransactions, getTransactionById, createTransaction } from '../controllers/TransactionController';
import sampleTransactions from '../seeders/sampleTransactions';

describe('Integration tests for Transaction', () => {
  it('create a transaction, classify it correctly and return it when prompted', async () => {
    let transaction: any = {
      id: 'TRN00006',
      amount: (-200.00).toFixed(2).toString(),
      timestamp: new Date('2021-05-05').toISOString().slice(0, 19).replace('T', ' '),
      description: 'Test transaction 6',
      transactiontype: 'debit',
      accountnumber: 'ACCOUN0123456789'
    }
    // Create a new transaction which will be classified by the API
    const req = createRequest<Request>();
    req.body = transaction;
    const res = createResponse<Response>();
    await createTransaction(req, res, () => { });
    await expect(res.statusCode).toEqual(201);

    // Get the transaction by id and check that it was classified correctly
    const req2 = createRequest<Request>({
      params: {
        id: transaction.id
      }
    });
    const res2 = createResponse<Response>();
    await getTransactionById(req2, res2, () => { });
    await expect(res2.statusCode).toEqual(200);
    transaction.transactioncategory = "Groceries";
    await expect(res2._getJSONData()).toEqual(transaction);

    // Get all transactions and check that the new transaction is included
    const req3 = createRequest<Request>();
    const res3 = createResponse<Response>();
    await getTransactions(req3, res3, () => { });
    await expect(res3.statusCode).toEqual(200);
    await expect(res3._getJSONData()).toContainEqual(transaction);
  });
});