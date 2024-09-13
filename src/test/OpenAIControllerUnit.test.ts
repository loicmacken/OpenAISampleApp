import jest from 'jest';
import { Request, Response } from 'express';
import { createRequest, createResponse } from 'node-mocks-http';

import { classifyTransaction, bulkClassifyTransactions } from '../controllers/OpenAIController';
import sampleTransactions from '../seeders/sampleTransactions';

describe('Unit tests for OpenAIController', () => {
  it('should classify a single transaction', async () => {
    const req = createRequest<Request>();
    req.body = sampleTransactions[0];
    const res = createResponse<Response>();
    await classifyTransaction(req, res, () => { });
    expect(res.statusCode).toEqual(200);
    req.body.transactionCategory = "Groceries";
    expect(res._getJSONData()).toEqual(req.body);
  });

  it('should throw an error if transaction data is invalid', async () => {
    const req = createRequest<Request>();
    req.body = {
      id: 'xxxxx',
      amount: -200.00,
      timestamp: 'xxxx-xx-xx',
      description: 'Test transaction 4',
      transactiontype: 'debit',
      accountnumber: 'ACCOUN0123456789'
    };
    const res = createResponse<Response>();
    await classifyTransaction(req, res, () => { });
    expect(res.statusCode).toEqual(400);
  });

  it('should classify multiple transactions', async () => {
    const req = createRequest<Request>();
    req.body = sampleTransactions;
    const res = createResponse<Response>();
    await bulkClassifyTransactions(req, res, () => { });
    expect(res.statusCode).toEqual(200);
    req.body.forEach((transaction: any) => {
      transaction.transactionCategory = "Groceries";
    });
    expect(res._getJSONData()).toEqual(req.body);
  });

  it('should throw an error if bulk transaction data is invalid', async () => {
    const req = createRequest<Request>();
    req.body = [
      {
        id: 'xxxxx',
        amount: (-200.00).toFixed(2).toString(),
        timestamp: new Date('2021-05-05').toISOString().slice(0, 19).replace('T', ' '),
        description: 'Test transaction 4',
        transactiontype: 'debit',
        accountnumber: 'ACCOUN0123456789'
      }
    ];
    const res = createResponse<Response>();
    await bulkClassifyTransactions(req, res, () => { });
    expect(res.statusCode).toEqual(400);
  });
});