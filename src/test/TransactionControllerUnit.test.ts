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
    expect(res.statusCode).toEqual(200);
    expect(res.json()).toEqual(sampleTransactions);
  });

  it('should return a transaction by id', async () => {
    const req = createRequest<Request>({
      params: {
        id: 'TRN00002'
      }
    });
    const res = createResponse<Response>();
    await getTransactionById(req, res, () => { });
    expect(res.statusCode).toEqual(200);
    expect(res.json()).toEqual(sampleTransactions[1]);
  });

  it('should throw an error if transaction id is not found', async () => {
    const req = createRequest<Request>({
      params: {
        id: '999999999'
      }
    });
    const res = createResponse<Response>();
    await getTransactionById(req, res, () => { });
    expect(res.statusCode).toEqual(204);
  });

  it('should create a new transaction', async () => {
    const req = createRequest<Request>({
      body: {
        id: 'TRN00004',
        amount: -200.00,
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        description: 'Test transaction 4',
        transactionType: 'debit',
        accountNumber: 'ACCOUN0123456789'
      }
    });
    const res = createResponse<Response>();
    await createTransaction(req, res, () => {});
    expect(res.statusCode).toEqual(201);
    expect(res.json()).toEqual(expect.objectContaining(req.body));
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
    expect(res.statusCode).toEqual(400);
  });
});

