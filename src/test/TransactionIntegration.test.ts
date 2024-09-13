import jest from 'jest';
import { Request, Response } from 'express';
import { createRequest, createResponse } from 'node-mocks-http';

import { getTransactions, getTransactionById, createTransaction } from '../controllers/TransactionController';
import sampleTransactions from '../seeders/sampleTransactions';

describe('Integration tests for Transaction', () => {
  it('create a transaction, classify it correctly and return it when prompted', async () => {
    // Create a new transaction which will be classified by the API
    const req = createRequest<Request>();
    req.body = sampleTransactions[0];
    const res = createResponse<Response>();
    await createTransaction(req, res, () => { });
    expect(res.statusCode).toEqual(201);
    
    // Get the transaction by id and check that it was classified correctly
    const req2 = createRequest<Request>({
      params: {
        id: req.body.id
      }
    });
    const res2 = createResponse<Response>();
    await getTransactionById(req2, res2, () => { });
    expect(res2.statusCode).toEqual(200);
    req.body.transactionCategory = "Groceries";
    expect(res2._getJSONData()).toEqual(req.body);

    // Get all transactions and check that the new transaction is included
    const req3 = createRequest<Request>();
    const res3 = createResponse<Response>();
    await getTransactions(req3, res3, () => { });
    expect(res3.statusCode).toEqual(200);
    expect(res3._getJSONData()).toContainEqual(req.body);
  });
});