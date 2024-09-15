import jest from 'jest';
import { Request, Response } from 'express';
import { createRequest, createResponse } from 'node-mocks-http';

import { getTransactions, getTransactionById, createTransaction } from '../controllers/TransactionController';
import sampleTransactions from '../seeders/sampleTransactions';

describe('Unit tests for TransactionController', () => {
  it('should return all transactions', async () => {
    const req = createRequest<Request>();
    const res = createResponse<Response>();
    await getTransactions(req, res, () => { });
    await expect(res.statusCode).toEqual(200);
    const data = await res._getJSONData();
    sampleTransactions.forEach((transaction) => {
      expect(data).toContainEqual(transaction);
    });
  });

  it('should return a transaction by id', async () => {
    const req = createRequest<Request>({
      params: {
        id: 'TRN00002'
      }
    });
    const res = createResponse<Response>();
    await getTransactionById(req, res, () => { });
    await expect(res.statusCode).toEqual(200);
    await expect(res._getJSONData()).toEqual(sampleTransactions[1]);
  });

  it('should return no content response if transaction id is not found', async () => {
    const req = createRequest<Request>({
      params: {
        id: '999999999'
      }
    });
    const res = createResponse<Response>();
    await getTransactionById(req, res, () => { });
    await expect(res.statusCode).toEqual(204);
  });

  it('should create a new transaction', async () => {
    const req = {
      body: {
        id: 'TRN00004',
        amount: (-200.00).toFixed(2).toString(),
        timestamp: new Date('2021-05-05').toISOString().slice(0, 19).replace('T', ' '),
        description: 'Test transaction 4',
        transactiontype: 'debit',
        accountnumber: 'ACCOUN0123456789',
        transactioncategory: 'Groceries'
      }
    };
    const res = createResponse<Response>();
    console.log("In unit test: " + JSON.stringify(req));
    await createTransaction(req as Request, res, () => {});
    await expect(res.statusCode).toEqual(201);
    await expect(res._getJSONData()).toEqual(expect.objectContaining(req.body));
  });

  it('should create a new transaction and classify it correctly', async () => {
    let transaction: any = {
      id: 'TRN00005',
      amount: (-200.00).toFixed(2).toString(),
      timestamp: new Date('2021-05-05').toISOString().slice(0, 19).replace('T', ' '),
      description: 'Test transaction 5',
      transactiontype: 'debit',
      accountnumber: 'ACCOUN0123456789'
    }
    console.log("In unit test, transaction: " + JSON.stringify(transaction));
    const req = createRequest<Request>({
      body: transaction
    });
    const res = createResponse<Response>();
    await createTransaction(req, res, () => {});
    await expect(res.statusCode).toEqual(201);
    transaction.transactioncategory = 'Groceries';
    await expect(res._getJSONData()).toEqual(transaction);
  });

  it('should throw an error if transaction data is invalid', async () => {
    const req = createRequest<Request>({
      body: {
        id: 'xxxxx',
        amount: 'xxxxx',
      }
    });
    const res = createResponse<Response>();
    await createTransaction(req, res, () => {});
    await expect(res.statusCode).toEqual(400);
  });
});

