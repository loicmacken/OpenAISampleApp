import e, { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import sampleTransactions from '../seeders/sampleTransactions';
import OpenAI from 'openai';
import sampleOpenAIResponse from './sampleOpenAIResponse';
import { createRequest, createResponse } from 'node-mocks-http';

const validateTransaction = (transaction: any) => {
  const validId = transaction.id && typeof transaction.id === 'string' && transaction.id.length === 8;
  const validAmount = transaction.amount && typeof transaction.amount === 'string' && !isNaN(parseFloat(transaction.amount));
  const validTimestamp = transaction.timestamp && typeof transaction.timestamp === 'string' && !isNaN(Date.parse(transaction.timestamp));
  const validTransactionType = transaction.transactiontype && typeof transaction.transactiontype === 'string';
  const validAccountNumber = transaction.accountnumber && typeof transaction.accountnumber === 'string' && transaction.accountnumber.length === 16;
  if (validId && validAmount && validTimestamp && validTransactionType && validAccountNumber) {
    return true;
  }
  return false;
}

export const classifyTransaction = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (validateTransaction(req.body)) {
    let openAIResponse: any;

    // skip openAI API call in test and dev environment
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
      openAIResponse = sampleOpenAIResponse;
    }
    else {
      // call openAI API to classify transaction
      const key = process.env.OPENAI_API_KEY;

      const client = new OpenAI({
        apiKey: key
      });
      const openAIreq = {
        model: 'gpt-4o-mini',
        messages: [
          {
            "role": "system",
            "content": `You have a new transaction to classify. 
            All transactions should be classified into one of the following categories: `
              + sampleTransactions.map((transaction: any) => transaction.transactioncategory).join(', ') + `.
            Please classify the following transaction: ` + req.body,
          }
        ],
        logprobs: true,
        n: 1,
        top_logprobs: 10
      };
      openAIResponse = await client.chat.completions.create(openAIreq as any) as any;
    }

    // return transaction with category
    const category = openAIResponse.choices[0].logprobs.content[0].top_logprobs[0].token;
    req.body.transactioncategory = category;
    res.status(200).json(req.body);
    return;
  }
  else {
    res.status(400).json({ message: 'Invalid transaction data' });
    return;
  }
});

export const bulkClassifyTransactions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const transactions = req.body;

  for (const transaction of transactions) {
    if (!validateTransaction(transaction)) {
      res.status(400).json({ message: 'Invalid transaction data' });
      return;
    }
    const individualReq = createRequest<Request>();
    individualReq.body = transaction;
    const individualRes = createResponse<Response>();
    classifyTransaction(individualReq, individualRes, () => {});
  }

  res.status(200).json(transactions);
});