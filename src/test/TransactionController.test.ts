import jest from 'jest';
import { Request, Response } from 'express';
import { createRequest, createResponse } from 'node-mocks-http';

import { getTransactions, getTransactionById, createTransaction } from '../controllers/TransactionController';

// describe('Unit tests for TransactionController', () => {
//   it('should return all transactions', async () => {
//     const req = createRequest<Request>();
//     const res = createResponse<Response>();
//     await getTransactions(req, res);
//     expect(res.statusCode).to.equal(200);
//     // TODO: Add assertions for the response body
//   });

//   it('should return a transaction by id', async () => {
//     const req = createRequest<Request>({
//       params: {
//         // TODO: Add real transaction id
//         id: '1'
//       }
//     });
//     const res = createResponse<Response>();
//     await getTransactionById(req, res);
//     expect(res.statusCode).to.equal(200);
//     // TODO: Add assertions for the response body
//   });

//   it('should throw an error if transaction id is not found', async () => {
//     const req = createRequest<Request>({
//       params: {
//         // TODO: Add invalid transaction id
//         id: '999999999'
//       }
//     });
//     const res = createResponse<Response>();
//     await getTransactionById(req, res);
//     expect(res.statusCode).to.equal(204);
//   });

//   it('should create a new transaction', async () => {
//     const req = createRequest<Request>({
//       body: {
//         // TODO: Add real transaction data
//       }
//     });
//     const res = createResponse<Response>();
//     await createTransaction(req, res);
//     expect(res.statusCode).to.equal(201);
//     // TODO: Add assertions for the response body
//   });

//   it('should throw an error if transaction data is invalid', async () => {
//     const req = createRequest<Request>({
//       body: {
//         // TODO: Add invalid transaction data
//       }
//     });
//     const res = createResponse<Response>();
//     await createTransaction(req, res);
//     expect(res.statusCode).to.equal(400);
//   });
// });

